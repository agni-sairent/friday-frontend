import { Injectable } from '@angular/core';
import {HttpClient, HttpResponse} from '@angular/common/http';
import {AuthRequest} from './requests/AuthRequest';
import {AuthResponse} from './requests/AuthResponse';
import {SchoolScheduleResponse} from './requests/SchoolScheduleResponse';
import {HomeworkResponse} from './requests/HomeworkResponse';
import {WorkResponse} from './requests/WorkResponse';
import {Observable} from 'rxjs';
import {AuthValidateResponse} from './requests/AuthValidateResponse';
import {Router} from '@angular/router';
import {UserValidation} from './models/UserValidation';
import {Homework} from './models/Homework';
import {Workday} from './models/Workday';

@Injectable({
  providedIn: 'root'
})
export class ClientService {

  constructor(private http: HttpClient,
              private router: Router) { }
  private AUTH_SERVICE_URL = 'http://localhost:8000/';
  private FRIDAY_SERVICE_URL = 'http://localhost:8001/';
  currentUser: UserValidation;
  AUTH_TOKEN: string;

  saveAuthToken(authToken: string): void{
    this.AUTH_TOKEN = authToken;
    localStorage.setItem('AUTH_TOKEN', authToken);
  }

  authenticate(authRequest: AuthRequest): Observable<HttpResponse<AuthResponse>> {
    return this.http.post<AuthResponse>(this.AUTH_SERVICE_URL + 'auth/login/', authRequest, {observe: 'response'});
  }

  getSchoolSchedule(): Observable<SchoolScheduleResponse> {
    return this.http.get<SchoolScheduleResponse>(this.FRIDAY_SERVICE_URL + 'subjects/', {params: {token: this.AUTH_TOKEN}});
  }

  getHomework(): Observable<HomeworkResponse> {
    return this.http.get<HomeworkResponse>(this.FRIDAY_SERVICE_URL + 'homework/', {params: {token: this.AUTH_TOKEN}});
  }

  createHomework(homework: Homework): Observable<any>{
    return this.http.post(this.FRIDAY_SERVICE_URL + 'homework/create/', {...homework, token: this.AUTH_TOKEN});
  }

  getWork(): Observable<WorkResponse> {
    return this.http.get<WorkResponse>(this.FRIDAY_SERVICE_URL + 'work/', {params: {token: this.AUTH_TOKEN}});
  }

  createWorkday(workday: Workday): Observable<any>{
    return this.http.post(this.FRIDAY_SERVICE_URL + 'workday/create/', {...workday, token: this.AUTH_TOKEN});
  }

  validateUserAuthToken(authToken: string): Observable<AuthValidateResponse>{
    return this.http.get<AuthValidateResponse>(this.AUTH_SERVICE_URL + 'auth/validate/', {params: {token: authToken}});
  }

  tryToAuthenticateFormCache(successRoute: string): void{
    let token = localStorage.getItem('AUTH_TOKEN'); // Throws error if its const wtf JS
    if (token){ // if some token is stored in LocalStorage
      this.validateUserAuthToken(token).subscribe(resp => {
        console.log('Validating user...');
        if (resp.status === 200) {
          this.AUTH_TOKEN = token;
          this.currentUser = resp.user;
          this.router.navigate([successRoute]);
        }
      });
    }
  }
}
