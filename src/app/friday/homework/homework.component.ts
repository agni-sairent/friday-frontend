import {Component, Input, OnInit} from '@angular/core';
import {Homework} from '../models/Homework';

@Component({
  selector: 'app-homework',
  templateUrl: './homework.component.html',
  styleUrls: ['./homework.component.sass']
})
export class HomeworkComponent implements OnInit {
  @Input() homework: Homework;

  constructor() { }

  ngOnInit(): void {
  }

}
