import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'capitalize' })
export class CapitalizePipe implements PipeTransform {
  transform(stringToCap: string): string {
    return stringToCap.substr(0, 1).toUpperCase() + stringToCap.substr(1);
  }
}
