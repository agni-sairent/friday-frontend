import {Work} from '../models/Work';

export interface WorkResponse{
  status: number;
  workdays: Work[];
}
