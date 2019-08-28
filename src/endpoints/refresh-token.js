const { getToken, verifyToken, generateTokens } = require('../lib/auth-utils')
const { response } = require('../lib/response-utils')

exports.postHandler = async event => {
  try {
    const refreshToken = getToken(event.headers.Authorization, 'Bearer')
    const { sub: user } = await verifyToken(refreshToken, 'RT')

    return response(200, await generateTokens({ user }))
  } catch (error) {
    console.error(error.status, error.message)

    return response(error.status, error.message)
  }
}
