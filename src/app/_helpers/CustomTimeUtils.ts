import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class CustomTimeUtils {
  static getASWeekdayNumber(): number{
    const weekday = new Date().getDay();
    if (weekday === 0){
      return 7;
    }
    return weekday;
  }
}
