import { Injectable } from '@angular/core';
import {HttpClient, HttpResponse} from '@angular/common/http';
import {AuthRequest} from '../friday/requests/AuthRequest';
import {AuthResponse} from '../friday/requests/AuthResponse';
import {SchoolScheduleResponse} from '../friday/requests/SchoolScheduleResponse';
import {HomeworkResponse} from '../friday/requests/HomeworkResponse';
import {WorkResponse} from '../friday/requests/WorkResponse';
import {Observable} from 'rxjs';
import {AuthValidateResponse} from '../friday/requests/AuthValidateResponse';
import {Router} from '@angular/router';
import {UserValidation} from '../friday/models/UserValidation';
import {Homework} from '../friday/models/Homework';
import {Workday} from '../friday/models/Workday';
import {SchoolSubject} from '../friday/models/SchoolSubject';

@Injectable({
  providedIn: 'root'
})
export class ClientService {

  constructor(private http: HttpClient,
              private router: Router) { }
  private AUTH_SERVICE_URL = 'http://localhost:10875/heimdall/api/';
  private FRIDAY_SERVICE_URL = 'http://localhost:10875/friday/api/';
  currentUser: UserValidation;
  AUTH_TOKEN: string;

  saveAuthToken(authToken: string): void{
    this.AUTH_TOKEN = authToken;
    localStorage.setItem('AUTH_TOKEN', authToken);
  }

  authenticate(authRequest: AuthRequest): Observable<HttpResponse<AuthResponse>> {
    return this.http.post<AuthResponse>(this.AUTH_SERVICE_URL + 'auth/login/', authRequest, {observe: 'response'});
  }

  logout(): void{
    this.AUTH_TOKEN = '';
    localStorage.setItem('AUTH_TOKEN', '');
    this.currentUser = null;
    this.router.navigate(['login']);
  }

  getSchoolSchedule(): Observable<SchoolScheduleResponse> {
    return this.http.get<SchoolScheduleResponse>(this.FRIDAY_SERVICE_URL + 'subject/', {params: {token: this.AUTH_TOKEN}});
  }

  getSchoolScheduleForWeekday(weekday: number): Observable<SchoolScheduleResponse> {
    return this.http.get<SchoolScheduleResponse>(this.FRIDAY_SERVICE_URL + 'subject/' + weekday + '/', {params: {token: this.AUTH_TOKEN}});
  }

  createSubject(subject: SchoolSubject): Observable<any>{
    return this.http.post(this.FRIDAY_SERVICE_URL + 'subject/', {...subject, token: this.AUTH_TOKEN});
  }

  removeSubject(id: number): Observable<any> {
    return this.http.delete(this.FRIDAY_SERVICE_URL + 'subject/' + id.toString() + '/', {params: {token: this.AUTH_TOKEN}});
  }

  getHomework(): Observable<HomeworkResponse> {
    return this.http.get<HomeworkResponse>(this.FRIDAY_SERVICE_URL + 'homework/', {params: {token: this.AUTH_TOKEN}});
  }

  createHomework(homework: Homework): Observable<any>{
    return this.http.post(this.FRIDAY_SERVICE_URL + 'homework/', {...homework, token: this.AUTH_TOKEN});
  }

  removeHomework(id: number): Observable<any> {
    return this.http.delete(this.FRIDAY_SERVICE_URL + 'homework/' + id.toString() + '/', {params: {token: this.AUTH_TOKEN}});
  }

  getWork(): Observable<WorkResponse> {
    return this.http.get<WorkResponse>(this.FRIDAY_SERVICE_URL + 'work/', {params: {token: this.AUTH_TOKEN}});
  }

  createWorkday(workday: Workday): Observable<any>{
    return this.http.post(this.FRIDAY_SERVICE_URL + 'work/', {...workday, token: this.AUTH_TOKEN});
  }

  removeWorkday(id: number): Observable<any> {
    return this.http.delete(this.FRIDAY_SERVICE_URL + 'work/' + id.toString() + '/', {params: {token: this.AUTH_TOKEN}});
  }

  validateUserAuthToken(authToken: string): Observable<AuthValidateResponse>{
    return this.http.get<AuthValidateResponse>(this.AUTH_SERVICE_URL + 'auth/validate/', {params: {token: authToken}});
  }

  tryToAuthenticateFormCache(successRoute: string): void{
    const token = localStorage.getItem('AUTH_TOKEN'); // Throws error if its const wtf JS
    if (token){ // if some token is stored in LocalStorage
      this.validateUserAuthToken(token).subscribe(resp => {
        if (resp.status === 200) {
          this.AUTH_TOKEN = token;
          this.currentUser = resp.user;
          this.router.navigate([successRoute]);
        }
      });
    }
  }
}
