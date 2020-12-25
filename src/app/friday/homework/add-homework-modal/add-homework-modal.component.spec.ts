import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddHomeworkModalComponent } from './add-homework-modal.component';

describe('AddHomeworkModalComponent', () => {
  let component: AddHomeworkModalComponent;
  let fixture: ComponentFixture<AddHomeworkModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddHomeworkModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddHomeworkModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
