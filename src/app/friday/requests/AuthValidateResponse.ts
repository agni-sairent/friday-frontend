import {UserValidation} from '../models/UserValidation';

export interface AuthValidateResponse{
  status: number;
  user?: UserValidation;
}
