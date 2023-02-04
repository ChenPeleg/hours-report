export const veryBasicHash = (str) =>
  Buffer.from(
    `${str
      .split('')
      .reduce((s, c) => (Math.imul(31, s) + c.charCodeAt(0)) | 0, 0)}`
  ).toString('base64');
