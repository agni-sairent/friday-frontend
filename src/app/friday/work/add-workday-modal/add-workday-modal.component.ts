import {Component, ElementRef, EventEmitter, OnInit, Output, ViewChild} from '@angular/core';
import {ClientService} from '../../client.service';

@Component({
  selector: 'app-add-workday-modal',
  templateUrl: './add-workday-modal.component.html',
  styleUrls: ['./add-workday-modal.component.sass']
})
export class AddWorkdayModalComponent implements OnInit {
  @ViewChild('workdayTopic') workdayTopic: ElementRef;
  @ViewChild('workdaySince') workdaySince: ElementRef;
  @ViewChild('workdayUntil') workdayUntil: ElementRef;
  @Output() newWorkday: EventEmitter<any> = new EventEmitter();
  selectedWorkday = NaN;
  isModalActive = false;

  constructor(private client: ClientService) { }

  ngOnInit(): void {
  }

  submitWorkdayForm(): void{
    const workday = {topic: this.workdayTopic.nativeElement.value, workday: this.selectedWorkday,
      since: this.workdaySince.nativeElement.value, until: this.workdayUntil.nativeElement.value,
      user_reference: this.client.currentUser.for};
    this.client.createWorkday(workday).subscribe(resp => {
      if (resp.status === 201){
        this.newWorkday.emit();
        this.toggleModal();
      }
    });
  }

  changeSelectedDay(weekday: number): void{
    this.selectedWorkday = weekday;
  }

  toggleModal(): void{
    this.selectedWorkday = NaN;
    this.isModalActive = !this.isModalActive;
  }
}
