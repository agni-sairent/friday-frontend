import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-weekday-picker',
  templateUrl: './weekday-picker.component.html',
  styleUrls: ['./weekday-picker.component.sass']
})
export class WeekdayPickerComponent implements OnInit {
  selectedDay = NaN;

  constructor() { }

  ngOnInit(): void {
  }

  changeSelectedDay(weekday: number): void{
    this.selectedDay = weekday;
  }
}
