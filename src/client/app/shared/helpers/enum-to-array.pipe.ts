import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'enumToArray' })
export class EnumToArrayPipe implements PipeTransform {
  /**
   * Pipe that transforms Typescript Enum to JavaScript array. Very useful for predefined "array" of values
   * @param enumToTransform Enum that needs to be treated as an array
   */
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
