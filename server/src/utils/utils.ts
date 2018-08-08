const base62Charset = Array.from(
  '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'
);

/**
 * A function that takes in a length and makes a random string that many character long from 0-9a-Z
 * @param length how many characters long to make the random string
 * @returns {string} id - The generated string that is returned
 */
export function makeId(length): string {
  let id = '';
  for (let i = 0; i < length; i++) {
    id += base62Charset[Math.round(Math.random() * 100) % 62];
  }
  return id;
}

/**
 * A function to check if a value is null or undefined and return a blank string or the value 'null'
 * @param {string | number }value the value that needs to be checked if null or undefined
 * @returns {number | string} a blank string or the value null
 */
export function checkNull(value: string | number): string | number {
  if ( typeof value === 'string') {
    return value ? value : '';
  } else if (typeof value === 'number') {
    return value ? value : null;
  } else {
    return '';
  }
}
