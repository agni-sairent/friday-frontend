import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Homework} from '../models/Homework';
import {ClientService} from '../client.service';

@Component({
  selector: 'app-homework',
  templateUrl: './homework.component.html',
  styleUrls: ['./homework.component.sass']
})
export class HomeworkComponent implements OnInit {
  @Input() homework: Homework;
  @Output() delete: EventEmitter<Homework> = new EventEmitter();

  constructor(private client: ClientService) { }

  ngOnInit(): void {
  }

  finishHomework(): void{
    this.client.removeWorkday(this.homework.id).subscribe(resp => {
      if (resp.status === 200){
        this.delete.emit(this.homework);
      }
    });
  }
}
