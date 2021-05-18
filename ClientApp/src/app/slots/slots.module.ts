import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { AddSlotComponent } from './add-slot/add-slot.component';
import { ListSlotComponent } from './list-slot/list-slot.component';
import { SlotsRoutingModule } from './slots-routing.module';
import { MatTimepickerModule } from 'mat-timepicker';
import {MatDialogModule} from '@angular/material/dialog';
import {MatSnackBarModule} from '@angular/material/snack-bar';


@NgModule({
  declarations: [
    AddSlotComponent,
    ListSlotComponent
  ],
  imports: [
    CommonModule,
    MatTimepickerModule,
    MatDialogModule,
    SlotsRoutingModule,
    MatSnackBarModule,
    SharedModule
  ]
})
export class SlotsModule { }
