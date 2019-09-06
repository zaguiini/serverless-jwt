import { CustomAuthorizerEvent } from 'aws-lambda'
import { getToken, verifyToken } from 'src/lib/auth-utils'

const generatePolicy = (principalId: string, Resource: string) => {
  return {
    principalId,
    policyDocument: {
      Version: '2012-10-17',
      Statement: [
        {
          Action: 'execute-api:Invoke',
          Effect: 'Allow',
          Resource,
        },
      ],
    },
  }
}

export const handler = async (event: CustomAuthorizerEvent) => {
  try {
    const accessToken = getToken(event.authorizationToken!, 'Bearer')
    const { sub } = await verifyToken(accessToken, 'AT')

    return generatePolicy(sub, event.methodArn)
  } catch (error) {
    console.log(error)
    throw 'Unauthorized'
  }
}
