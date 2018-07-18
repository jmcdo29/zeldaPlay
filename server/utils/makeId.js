const base62Charset = Array.from(
  '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'
);
function makeId(length) {
  let id = '';
  for (let i = 0; i < length; i++) {
    id += base62Charset[Math.round(Math.random() * 100) % 62];
  }
  return id;
}

module.exports.makeId = makeId;