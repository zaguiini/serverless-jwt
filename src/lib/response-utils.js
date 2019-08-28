exports.response = (statusCode, body) => ({
  statusCode,
  body: JSON.stringify(body),
})

exports.error = (status, message) => {
  const theError = new Error(message)
  theError.status = status

  return theError
}
