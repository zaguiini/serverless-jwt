const {
  getToken,
  getUserAndPassword,
  generateTokens,
} = require('../lib/auth-utils')
const { response, error } = require('../lib/response-utils')

const checkCredentials = ({ user, password }) => {
  if (user !== 'user@example.com' || password !== 'password') {
    throw error(401, 'Invalid credentials')
  }
}

exports.postHandler = async event => {
  try {
    const token = getToken(event.headers.Authorization, 'Basic')
    const { user, password } = getUserAndPassword(token)
    await checkCredentials({ user, password })

    const tokens = await generateTokens({ user })

    return response(200, tokens)
  } catch (error) {
    console.error(error.status, error.message)

    return response(error.status, error.message)
  }
}
