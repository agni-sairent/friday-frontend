import {Work} from '../models/Work';

export interface WorkResponse{
  status: number;
  work: Work[];
}
