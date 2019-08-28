const { promisify } = require('util')
const jwt = require('jsonwebtoken')

const { decodeBase64 } = require('./string-utils')
const { error } = require('./response-utils')

const sign = promisify(jwt.sign)
const verify = promisify(jwt.verify)

exports.getUserAndPassword = base64Credentials => {
  const [user, password] = decodeBase64(base64Credentials).split(':')

  return { user, password }
}

exports.verifyToken = async (token, tokenType) => {
  console.log('token', token)

  try {
    const decoded = await verify(token, 'secret')

    if (decoded.jty !== tokenType) {
      throw new Error(`Incorrect token type. Expected: ${tokenType}`)
    }

    console.log('decoded token', JSON.stringify(decoded))

    return decoded
  } catch (e) {
    console.log('error decoding token', e)
    throw error(401, 'Invalid credentials')
  }
}

exports.getToken = (auth, correctType) => {
  const [type, credentials] = auth.split(' ')

  if (type !== correctType || !credentials) {
    throw error(400, 'Invalid credentials type')
  }

  return credentials
}

exports.generateTokens = async ({ user }) => {
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
