import { APIGatewayEvent } from 'aws-lambda'
import { generateTokens, getToken, getUserAndPassword } from 'src/lib/auth-utils'
import { error, response } from 'src/lib/response-utils'

const checkCredentials = ({
  user,
  password,
}: {
  user: string
  password: string
}) => {
  if (user !== 'user@example.com' || password !== 'password') {
    throw error(401, 'Invalid credentials')
  }
}

export const postHandler = async (event: APIGatewayEvent) => {
  try {
    const token = getToken(event.headers.Authorization, 'Basic')
    const { user, password } = getUserAndPassword(token)

    checkCredentials({ user, password })

    const tokens = await generateTokens({ user })

    return response(200, tokens)
  } catch (error) {
    console.error(error.status, error.message)

    return response(error.status, error.message)
  }
}
