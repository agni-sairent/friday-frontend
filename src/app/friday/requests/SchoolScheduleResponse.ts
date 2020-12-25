import {SchoolSubject} from '../models/SchoolSubject';

export interface SchoolScheduleResponse {
  status: number;
  subjects: SchoolSubject[];
}
