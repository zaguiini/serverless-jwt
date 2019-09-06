export const decodeBase64 = (string: string) =>
  Buffer.from(string, 'base64').toString('ascii')
