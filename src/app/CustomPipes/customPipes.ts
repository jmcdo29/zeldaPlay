import { Pipe, PipeTransform, NgModule } from '@angular/core';

@Pipe({name: 'enumToArray'})
export class EnumToArrayPipe implements PipeTransform {
  transform(enumToTransform: Object): Array<any> {
    const retArray = new Array();
    // tslint:disable-next-line:forin
    for (const key in enumToTransform) {
      if (!isNaN(Number(key))) {
        retArray.push(enumToTransform[key]);
      }
    }
    return retArray;
  }
}

@NgModule({
  declarations: [EnumToArrayPipe],
  exports: [EnumToArrayPipe]
})
export class SharedModule {}

