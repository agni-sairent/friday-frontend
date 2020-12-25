import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';

@Component({
  selector: 'app-add-subject-modal',
  templateUrl: './add-subject-modal.component.html',
  styleUrls: ['./add-subject-modal.component.sass']
})
export class AddSubjectModalComponent implements OnInit {
  isModalActive = false;

  constructor() { }

  ngOnInit(): void {
  }

  toggleModal(): void {
    this.isModalActive = !this.isModalActive;
  }
}
