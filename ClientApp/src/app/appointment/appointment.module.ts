import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListAppointmentsComponent } from './list-appointments/list-appointments.component';
import { AppointmentRoutingModule } from './appointment-routing.module';
import { SharedModule } from '../shared/shared.module';
import { DragDropModule } from '@angular/cdk/drag-drop';
import {MatTableModule} from '@angular/material/table';



@NgModule({
  declarations: [
    ListAppointmentsComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    DragDropModule,
    MatTableModule,
    AppointmentRoutingModule
  ]
})
export class AppointmentModule { }
