import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'shortsummary'
})
export class ShortSummaryPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    if (typeof value === 'string' && value) {
      if (value.length > 200) {
        return value.substr(0, 199) + '...';
      } else {
        return value;
      }
    }
    return value;
  }

}
