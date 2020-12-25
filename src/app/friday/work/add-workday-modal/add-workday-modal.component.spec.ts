import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddWorkdayModalComponent } from './add-workday-modal.component';

describe('AddWorkdayModalComponent', () => {
  let component: AddWorkdayModalComponent;
  let fixture: ComponentFixture<AddWorkdayModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddWorkdayModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddWorkdayModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
