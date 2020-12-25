import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FridayComponent } from './friday/friday.component';
import { SidenavComponent } from './sidenav/sidenav.component';
import { HomeworkComponent } from './friday/homework/homework.component';
import { SchoolScheduleComponent } from './friday/school-schedule/school-schedule.component';
import { WorkComponent } from './friday/work/work.component';
import {HttpClientModule} from '@angular/common/http';
import { LoginComponent } from './login/login.component';
import { AddSubjectModalComponent } from './friday/school-schedule/add-subject-modal/add-subject-modal.component';
import { AddHomeworkModalComponent } from './friday/homework/add-homework-modal/add-homework-modal.component';
import { AddWorkdayModalComponent } from './friday/work/add-workday-modal/add-workday-modal.component';
import { WeekdayPickerComponent } from './weekday-picker/weekday-picker.component';

@NgModule({
  declarations: [
    AppComponent,
    FridayComponent,
    SidenavComponent,
    HomeworkComponent,
    SchoolScheduleComponent,
    WorkComponent,
    LoginComponent,
    AddSubjectModalComponent,
    AddHomeworkModalComponent,
    AddWorkdayModalComponent,
    WeekdayPickerComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
