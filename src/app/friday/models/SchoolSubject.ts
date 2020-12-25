import {Time} from '@angular/common';

export interface SchoolSubject{
  id: number;
  short: string;
  name: string;
  room: string;
  weekday: number;
  repeat_interval: string;
  time_start: string;
  time_end: string;
  type: string;
  user_reference: string;
}
