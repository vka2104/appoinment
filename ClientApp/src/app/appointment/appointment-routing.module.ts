import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListAppointmentsComponent } from './list-appointments/list-appointments.component';

const routes: Routes = [
  {
    path:"", component: ListAppointmentsComponent
  },
  {
    path:"**", redirectTo: ""
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AppointmentRoutingModule { }
