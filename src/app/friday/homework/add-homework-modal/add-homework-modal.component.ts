import {Component, ElementRef, EventEmitter, OnInit, Output, ViewChild} from '@angular/core';
import {ClientService} from '../../client.service';

@Component({
  selector: 'app-add-homework-modal',
  templateUrl: './add-homework-modal.component.html',
  styleUrls: ['./add-homework-modal.component.sass']
})
export class AddHomeworkModalComponent implements OnInit {
  @ViewChild('homeworkTitle') homeworkTitle: ElementRef;
  @ViewChild('homeworkText') homeworkText: ElementRef;
  @ViewChild('homeworkDeadline') homeworkDeadline: ElementRef;
  @Output() newHomework: EventEmitter<any> = new EventEmitter();
  isModalActive = false;

  constructor(private client: ClientService) { }

  ngOnInit(): void {
  }

  submitHomeworkForm(): void{
    const homework = {header: this.homeworkTitle.nativeElement.value, description: this.homeworkText.nativeElement.value,
                      deadline: this.homeworkDeadline.nativeElement.value, user_reference: this.client.currentUser.for};
    this.client.createHomework(homework).subscribe(resp => {
      if (resp.status === 201){
        this.newHomework.emit();
        this.toggleModal();
      }
    });
  }

  toggleModal(): void{
    this.isModalActive = !this.isModalActive;
  }
}
