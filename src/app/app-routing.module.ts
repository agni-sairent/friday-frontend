import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FridayComponent } from './friday/friday.component';
import {AuthGuard} from './_helpers/auth.guard';
import {LoginComponent} from './login/login.component';
import {SidenavComponent} from './sidenav/sidenav.component';

const routes: Routes = [
  { path: '', component: SidenavComponent, canActivate: [AuthGuard]},
  { path: 'friday', component: FridayComponent, canActivate: [AuthGuard] },
  { path: 'login', component: LoginComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
