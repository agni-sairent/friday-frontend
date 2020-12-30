import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'dayMonthFlip' })

export class DayMonthReversePipe implements PipeTransform {
  transform(value): string {
    const dateSplit = value.split('.');
    return dateSplit[1] + '.' + dateSplit[0];
  }
}
