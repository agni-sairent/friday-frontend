import {Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {SchoolSubject} from '../../models/SchoolSubject';
import {CustomTimeUtils} from '../../../_helpers/CustomTimeUtils';
import {ClientService} from '../../../_helpers/client.service';

@Component({
  selector: 'app-add-subject-modal',
  templateUrl: './add-subject-modal.component.html',
  styleUrls: ['./add-subject-modal.component.sass']
})
export class AddSubjectModalComponent implements OnInit {
  @ViewChild('subjectShort') short: ElementRef;
  @ViewChild('subjectName') name: ElementRef;
  @ViewChild('subjectRoom') room: ElementRef;
  @ViewChild('subjectInterval') interval: ElementRef;
  @ViewChild('subjectType') type: ElementRef;
  @ViewChild('subjectStart') start: ElementRef;
  @ViewChild('subjectDurationHours') durationHours: ElementRef;
  @ViewChild('subjectDurationMinutes') durationMinutes: ElementRef;
  @Output() newSubject: EventEmitter<any> = new EventEmitter();
  @Input() subjects: SchoolSubject[];
  time = {hour: 13, minute: 30};
  selectedType = 'LR';
  selectedInterval = 'NL';
  selectedWeekday = CustomTimeUtils.getASWeekdayNumber();

  isModalActive = false;
  constructor(private client: ClientService) { }

  ngOnInit(): void {
  }

  toggleModal(): void {
    this.isModalActive = !this.isModalActive;
  }

  changeSelectedType(type: string): void{
    this.selectedType = type;
  }

  changeSelectedInterval(interval: string): void{
    this.selectedInterval = interval;
  }

  changeSelectedWeekday(weekday: number): void{
    this.selectedWeekday = weekday;
    this.updateSubjects();
  }

  createSubject(): void{
    const timeStart = this.start.nativeElement.value;
    console.log(timeStart);
    const timeStartSplit = timeStart.split(':');

    const angularTimeEnd = {hours: Number(timeStartSplit[0]) + Number(this.durationHours.nativeElement.value),
      minutes: Number(timeStartSplit[1]) + Number(this.durationMinutes.nativeElement.value)};
    const timeEnd =  angularTimeEnd.hours.toString() + ':' + angularTimeEnd.minutes.toString();
    console.log(timeEnd);

    const subject = {short: this.short.nativeElement.value, name: this.name.nativeElement.value, room: this.room.nativeElement.value,
      weekday: this.selectedWeekday, repeat_interval: this.selectedInterval, time_start: timeStart, time_end: timeEnd,
      type: this.selectedType, user_reference: this.client.currentUser.for };

    this.client.createSubject(subject).subscribe(resp => {
      if (resp.status === 201){
        this.clearSubject();
        this.updateSubjects();
        this.newSubject.emit();
      }
    });
  }

  removeSubject(subjectId: number): void{
    this.client.removeSubject(subjectId).subscribe(resp => {
      if (resp.status === 200){
        this.updateSubjects();
      }
    });
  }

  private updateSubjects(): void{
    this.client.getSchoolScheduleForWeekday(this.selectedWeekday).subscribe(resp => {
      if (resp.status === 200){
        this.subjects = resp.subjects;
      }
    });
  }

  private clearSubject(): void{
    this.short.nativeElement.value = '';
    this.name.nativeElement.value = '';
    this.room.nativeElement.value = '';
  }
}
