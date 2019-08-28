exports.getHandler = async event => {
  return {
    statusCode: 200,
    body: JSON.stringify({
      email: event.requestContext.authorizer.principalId,
    }),
  }
}
