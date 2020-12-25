import {Component, ElementRef, Input, OnInit, ViewChild} from '@angular/core';
import {ClientService} from '../friday/client.service';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.sass']
})
export class SidenavComponent implements OnInit {
  constructor(private client: ClientService) { }

  ngOnInit(): void {
  }

}
