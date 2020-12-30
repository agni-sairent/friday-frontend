import {Component, ElementRef, ViewChild} from '@angular/core';
import {ClientService} from './_helpers/client.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent {
  title = 'hyper-core';

  constructor() { }


}

