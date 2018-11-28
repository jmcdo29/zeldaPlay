export class Utils {
  static base62Array: string[] = Array.from(
    '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'
  );

  static checkNull(value: string | number, type: string): string | number {
    if (type === 'string') {
      return value ? value : '';
    } else if (type === 'number') {
      return value === 0 || value ? value : null;
    } else {
      return undefined;
    }
  }

  static makeId(length): string {
    let id = '';
    for (let i = 0; i < length; i++) {
      id += Utils.base62Array[Math.round(Math.random() * 100) % 62];
    }
    return id;
  }
}
