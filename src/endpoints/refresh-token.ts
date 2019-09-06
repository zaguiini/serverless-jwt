import { APIGatewayEvent } from 'aws-lambda'
import { generateTokens, getToken, verifyToken } from 'src/lib/auth-utils'
import { response } from 'src/lib/response-utils'

export const postHandler = async (event: APIGatewayEvent) => {
  try {
    const refreshToken = getToken(event.headers.Authorization, 'Bearer')
    const { sub: user } = await verifyToken(refreshToken, 'RT')

    return response(200, await generateTokens({ user }))
  } catch (error) {
    console.error(error.status, error.message)

    return response(error.status, error.message)
  }
}
