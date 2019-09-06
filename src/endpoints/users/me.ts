import { APIGatewayEvent } from 'aws-lambda'

export const getHandler = async (event: APIGatewayEvent) => {
  return {
    statusCode: 200,
    body: JSON.stringify({
      email: event.requestContext.authorizer!.principalId,
    }),
  }
}
