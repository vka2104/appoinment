import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { getFormatedDate } from 'src/app/shared/components/methods/datetime-methods';
import { AddSlotComponent } from '../add-slot/add-slot.component';
import { RestApiService } from './../../core/services/rest-api.service';

@Component({
  selector: 'app-list-slot',
  templateUrl: './list-slot.component.html',
  styleUrls: ['./list-slot.component.css']
})
export class ListSlotComponent implements OnInit {
  slotList: any[];
  filaterCalenderDefaultDate: Date = new Date();
  currentDate: Date = new Date();
  morningSlotList: any[];
  isEnableAddSlot: boolean = false;
  eveningSlotList: any[];
  constructor(public restApiService:RestApiService, public dialog: MatDialog) {
    this.filterSlotsByDate(this.filaterCalenderDefaultDate, true);
  }

  ngOnInit(): void {
  }
  openDialog(slot_mode: String) {
    const selectedSlotDate = getFormatedDate(this.filaterCalenderDefaultDate);
    const dialogRef = this.dialog.open(AddSlotComponent,{
      disableClose: true,
      data:{
      slot_mode: slot_mode,
      selectedSlotDate
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      this.filterSlotsByDate(this.filaterCalenderDefaultDate, true);
    });
  }

  separateSlotsBySlotMode(slotList: any[]) {
    this.morningSlotList = slotList.filter(res => {
      return res.slot_mode === "morning";
    })
    this.eveningSlotList = slotList.filter(data => {
      return data.slot_mode === "evening"
    })
  }
  filterSlotsByDate(event: any,load: boolean) {
      this.filaterCalenderDefaultDate = event;
      let d = new Date(event);
      let selectedDateVal = d.getTime();
      let max_date_limit = this.currentDate.getTime();
      if(selectedDateVal >= max_date_limit || d.toDateString() === this.currentDate.toDateString()) {
        this.isEnableAddSlot = true;
      } else {
        this.isEnableAddSlot = false;
      }
    let selectedDate = getFormatedDate(d);
    this.slotList = [];
    this.restApiService.filterSlotsList(selectedDate).subscribe(res => {
      if(!res.error) {
        this.slotList = res.data;
        this.separateSlotsBySlotMode(this.slotList);
      }
    })
  }

}
