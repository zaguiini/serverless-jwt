const { getToken, verifyToken } = require('../lib/auth-utils')

const generatePolicy = (principalId, Resource) => {
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

exports.handler = async event => {
  try {
    const accessToken = getToken(event.authorizationToken, 'Bearer')
    const { sub } = await verifyToken(accessToken, 'AT')

    return generatePolicy(sub, event.methodArn)
  } catch (error) {
    console.log(error)
    throw 'Unauthorized'
  }
}
