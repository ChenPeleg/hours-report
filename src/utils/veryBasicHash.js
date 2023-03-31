export const veryBasicHash = (str) =>
  str
    .split('')
    .reduce((s, c) => (Math.imul(31, s) + c.charCodeAt(0)) | 0, 0)
    .toString(32)
    .replace('-', '')
