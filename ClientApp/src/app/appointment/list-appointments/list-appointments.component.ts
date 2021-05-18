import { Component, OnInit, ViewChild } from '@angular/core';
import {CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
// import {MatTable} from '@angular/material/table';
import { RestApiService } from './../../core/services/rest-api.service';
import { AppointmentList } from '../appointment-object';
import { getFormatedDate } from 'src/app/shared/components/methods/datetime-methods';

// export interface IHeaders {
//   id: string | number;
//   name: string;
//   age: number | string;
//   gender: string;
//   country: string;
// }
@Component({
  selector: 'app-list-appointments',
  templateUrl: './list-appointments.component.html',
  styleUrls: ['./list-appointments.component.css']
})
export class ListAppointmentsComponent implements OnInit {

  appointmentList: AppointmentList[];
  dateValue: any = new Date();
  todayCount: number = 0;
  totalCount: number = 0;
  constructor(public restApiService :RestApiService) { }

  ngOnInit(): void {
    this.filterAppointmets(this.dateValue, true);
  }
  dropTable(event: CdkDragDrop<any>) {
    moveItemInArray(this.appointmentList, event.previousIndex, event.currentIndex);
  }
  getAppointment() {
    this.appointmentList = [];
    this.dateValue = '';
    this.restApiService.getAppointmentsList().subscribe( res => {
      if(!res.error) {
        this.appointmentList = res.data;
        console.log(this.appointmentList)
      }
    })
  }
  filterAppointmets(event: any, load: boolean) {
    console.log(event);
    let d: Date;
    if(load) {
       d = new Date(event);
    } else {
       d = new Date(event.target.value);
    }
    let selectedDate = getFormatedDate(d);
    this.appointmentList = [];
    this.restApiService.filterAppointmentsList(selectedDate).subscribe(res => {
      if(!res.error) {
        this.appointmentList = res.data;
        if(load) {
          this.todayCount = this.appointmentList.length;
        }
      }
    })

  }

}
