import { Injectable } from '@nestjs/common';

@Injectable()
export class UtilsService {
  private base62Array: string[] = Array.from(
    '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'
  );

  checkNull(value: string | number, type: string): string | number {
    if (type === 'string') {
      return value ? value : '';
    } else if (type === 'number') {
      return value === 0 || value ? value : null;
    } else {
      return undefined;
    }
  }

  makeId(length): string {
    let id = '';
    for (let i = 0; i < length; i++) {
      id += this.base62Array[Math.round(Math.random() * 100) % 62];
    }
    return id;
  }
}
