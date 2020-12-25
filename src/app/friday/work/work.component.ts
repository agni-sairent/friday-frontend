import {Component, Input, OnInit} from '@angular/core';
import {Work} from '../models/Work';

@Component({
  selector: 'app-work',
  templateUrl: './work.component.html',
  styleUrls: ['./work.component.sass']
})
export class WorkComponent implements OnInit {
  @Input() workday: Work;

  constructor() { }

  ngOnInit(): void {
  }

}
