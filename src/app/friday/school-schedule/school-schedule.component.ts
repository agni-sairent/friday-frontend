import {Component, Input, OnInit} from '@angular/core';
import {SchoolSubject} from '../models/SchoolSubject';

@Component({
  selector: 'app-school-schedule',
  templateUrl: './school-schedule.component.html',
  styleUrls: ['./school-schedule.component.sass']
})
export class SchoolScheduleComponent implements OnInit {
  @Input() subject: SchoolSubject;

  constructor() { }

  ngOnInit(): void {
  }

}
