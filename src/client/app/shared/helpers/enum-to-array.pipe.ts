import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'enumToArray' })
export class EnumToArrayPipe implements PipeTransform {
  transform(enumToTransform: object): any[] {
    const retArray = [];
    for (const key in enumToTransform) {
      if (!isNaN(Number(key))) {
        retArray.push(enumToTransform[key]);
      }
    }
    return retArray;
  }
}
