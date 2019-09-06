import jwt, { SignOptions, VerifyOptions } from 'jsonwebtoken'
import { promisify } from 'util'

import { error } from './response-utils'
import { decodeBase64 } from './string-utils'

const sign = promisify<object, string, SignOptions, string>(jwt.sign)
const verify = promisify<string, string, VerifyOptions | undefined, any>(
  jwt.verify
)

export const getUserAndPassword = (base64Credentials: string) => {
  const [user, password] = decodeBase64(base64Credentials).split(':')

  return { user, password }
}

export const verifyToken = async (token: string, tokenType: 'AT' | 'RT') => {
  try {
    const decoded = await verify(token, 'secret', undefined)

    if (decoded.jty !== tokenType) {
      throw new Error(`Incorrect token type. Expected: ${tokenType}`)
    }

    return decoded
  } catch (e) {
    console.log('error decoding token', e)
    throw error(401, 'Invalid credentials')
  }
}

export const getToken = (auth: string, correctType: 'Bearer' | 'Basic') => {
  const [type, credentials] = auth.split(' ')

  if (type !== correctType || !credentials) {
    throw error(400, 'Invalid credentials type')
  }

  return credentials
}

export const generateTokens = async ({ user }: { user: string }) => {
  const accessToken = await sign({ jty: 'AT' }, 'secret', {
    expiresIn: '1h',
    subject: user,
  })

  const refreshToken = await sign({ jty: 'RT' }, 'secret', {
    expiresIn: '30 days',
    subject: user,
  })

  return {
    accessToken,
    refreshToken,
  }
}
