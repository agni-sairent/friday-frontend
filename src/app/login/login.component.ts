import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {ClientService} from '../_helpers/client.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.sass']
})
export class LoginComponent implements OnInit {
  @ViewChild('username') username: ElementRef;
  @ViewChild('password') password: ElementRef;
  isFormErrorHidden = true;

  constructor(private client: ClientService,
              private router: Router) { }

  ngOnInit(): void {
    this.client.tryToAuthenticateFormCache('/friday');
  }

  onLogin(): void{
    this.client.authenticate({username: this.username.nativeElement.value, password: this.password.nativeElement.value})
      .subscribe(resp => {
        if (resp.body.status === 200){
          this.client.saveAuthToken(resp.body.token);
          this.router.navigate(['/friday']);
        }else {
          this.isFormErrorHidden = false;
        }
      });
  }

}
