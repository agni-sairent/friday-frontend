import {Component, Input, OnInit} from '@angular/core';
import {ClientService} from './client.service';
import {SchoolSubject} from './models/SchoolSubject';
import {Homework} from './models/Homework';
import {Work} from './models/Work';

@Component({
  selector: 'app-friday',
  templateUrl: './friday.component.html',
  styleUrls: ['./friday.component.sass']
})
export class FridayComponent implements OnInit {
  subjects: SchoolSubject[];

  homeworks: Homework[];
  displayedHomeworks: Homework[];
  homeworksPagination = {page: 1, canGoPrevious: false, canGoNext: false};
  workdays: Work[];

  constructor(private client: ClientService) { }

  ngOnInit(): void {
    this.refreshSubjects();
    this.refreshHomeworks();
    this.refreshWork();
  }

  refreshSubjects(): void{
    this.client.getSchoolSchedule().subscribe(subjectResponse => {
      console.log(subjectResponse);
      if (subjectResponse.status === 200) {
        this.subjects = subjectResponse.subjects;
      }
    });
  }

  refreshHomeworks(): void{
    this.client.getHomework().subscribe(homeworkResponse => {
      if (homeworkResponse.status === 200) {
        this.homeworks = homeworkResponse.homeworks;
        this.paginateHomeworks();
        console.log(homeworkResponse);
      }
    });
  }

  paginateHomeworks(pageNumber= 1): void{
    if (pageNumber < 1){
      return;
    }
    if (3 * (pageNumber - 1) >= this.homeworks.length){
      return;
    }
    this.homeworksPagination.page = pageNumber;

    const startIndex = 3 * (pageNumber - 1);
    this.displayedHomeworks = this.homeworks.slice(3 * (pageNumber - 1), startIndex + 3);
    this.updateHomeworksPaginationConstraints();
  }

  updateHomeworksPaginationConstraints(): void{
    this.homeworksPagination.canGoPrevious = this.homeworksPagination.page !== 1;
    this.homeworksPagination.canGoNext = 3 * (this.homeworksPagination.page) < this.homeworks.length;
  }

  refreshWork(): void{
    this.client.getWork().subscribe(workResponse => {
      if (workResponse.status === 200) {
        this.workdays = workResponse.work;
      }
    });
  }

  homeworkRemovedEvent(homework: Homework): void{
    this.homeworks = this.homeworks.filter(item => item !== homework);
    this.paginateHomeworks();
  }
}
