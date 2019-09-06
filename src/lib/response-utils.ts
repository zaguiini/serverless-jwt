export const response = (statusCode: number, body?: string | object) => ({
  statusCode,
  body: JSON.stringify(body),
})

export const error = (status: number, message: string) => {
  const theError: Error & { status?: number } = new Error(message)
  theError.status = status

  return theError
}
