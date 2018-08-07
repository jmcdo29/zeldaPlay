const base62Charset = Array.from(
  '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'
);
export function makeId(length) {
  let id = '';
  for (let i = 0; i < length; i++) {
    id += base62Charset[Math.round(Math.random() * 100) % 62];
  }
  return id;
}

export function checkNull(value: string | number): string | number {
  if ( typeof value === 'string') {
    return value ? value : '';
  } else if (typeof value === 'number') {
    return value ? value : null;
  }
}
