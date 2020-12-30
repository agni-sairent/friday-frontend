import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {CustomTimeUtils} from '../_helpers/CustomTimeUtils';

@Component({
  selector: 'app-weekday-picker',
  templateUrl: './weekday-picker.component.html',
  styleUrls: ['./weekday-picker.component.sass']
})
export class WeekdayPickerComponent implements OnInit {
  @Input() autoInit: boolean;
  @Output() selectedDayChanged: EventEmitter<number> = new EventEmitter();
  selectedDay = NaN;

  constructor() { }

  ngOnInit(): void {
    if (this.autoInit){
      this.selectedDay = CustomTimeUtils.getASWeekdayNumber();
    }
  }

  changeSelectedDay(weekday: number): void{
    this.selectedDay = weekday;
    this.selectedDayChanged.emit(this.selectedDay);
  }


}
