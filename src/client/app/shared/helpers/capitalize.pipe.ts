import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'capitalize' })
export class CapitalizePipe implements PipeTransform {
  /**
   * Transformation function that capitalizes the first letter of a word.
   *
   * I.e. apply => Apply
   * @param stringToCap the string that is to be capitalized
   */
  transform(stringToCap: string): string {
    return stringToCap.substr(0, 1).toUpperCase() + stringToCap.substr(1);
  }
}
