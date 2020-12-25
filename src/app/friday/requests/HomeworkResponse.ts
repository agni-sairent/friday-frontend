import {Homework} from '../models/Homework';

export interface HomeworkResponse{
  status: number;
  homeworks: Homework[];
}
