import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { getDateTimeDifference, getFormatedDate, getFormatedTime } from 'src/app/shared/components/methods/datetime-methods';
import { RestApiService } from './../../core/services/rest-api.service';

@Component({
  selector: 'app-add-slot',
  templateUrl: './add-slot.component.html',
  styleUrls: ['./add-slot.component.css']
})
export class AddSlotComponent implements OnInit {
  slot_mode: any;
  minDate: Date;
  maxDate: Date;
  ToDateValue: Date;
  fromDateValue: Date;
  slotFormGroup: FormGroup;
  customErrorMessage: String = '';
  constructor(private _snackBar: MatSnackBar, public dialog: MatDialog, @Inject(MAT_DIALOG_DATA) public data: {slot_mode: string}, private fb: FormBuilder, public restApiService: RestApiService) {
    this.slot_mode = this.data.slot_mode;
    if(this.slot_mode === "morning") {
      this.minDate = new Date('2021-05-18T09:00');
      this.maxDate = new Date('2021-05-18T12:00');
    } else {
      this.minDate = new Date('2021-05-18T17:00');
      this.maxDate = new Date('2021-05-18T21:00');
    }
   }

  ngOnInit(): void {
    this.slotFormGroup = this.fb.group({
      from_time: ['', Validators.required],
      to_time: ['', Validators.required]
    });

  }
  getSlotDateAndTime(from_date: Date, to_date: Date) {

    let appoinment_date = getFormatedDate(from_date);
    let formated_from_date = getFormatedTime(from_date);
    let formated_to_date = getFormatedTime(from_date);
    return {
      doctor_id: '60a0c9dbd4958000152cf40b',
      appoinment_date,
      from_time: formated_from_date,
      to_time: formated_to_date,
      slot_mode: this.slot_mode
    }
  }

  addSlot(slotFormGroup) {
    if (slotFormGroup.errors === null && slotFormGroup.valid) {
      for (let i in this.slotFormGroup.controls) {
        this.slotFormGroup.controls[i].markAsUntouched();
        this.slotFormGroup.controls[i].markAsPristine();
      }
      const timeDifference = getDateTimeDifference(this.slotFormGroup.controls.from_time.value, this.slotFormGroup.controls.to_time.value);
      if(timeDifference.hours === 0 && timeDifference.minutes === 30 && timeDifference.seconds === 0) {
        let slotData = this.getSlotDateAndTime(new Date(this.slotFormGroup.controls.from_time.value), new Date(this.slotFormGroup.controls.to_time.value));
        console.log(slotData)
        this.restApiService.addSlots(slotData).subscribe(res => {
          if(!res.error) {
            this.dialog.closeAll();
            this.openSnackBar(res.message,'X','success');
          } else {
            this.openSnackBar(res.message,'X', 'error');
          }
        })
        this.customErrorMessage = '';
      } else {
        this.customErrorMessage = 'You can create a slot between 30 minutes.';
      }
    } else {
      for (let i in this.slotFormGroup.controls) {
        this.slotFormGroup.controls[i].markAsTouched();
        this.slotFormGroup.controls[i].markAsDirty();
      }
    }
  }
  openSnackBar(message: string, action: string, msgType: String) {
    this._snackBar.open(message, action, {
      duration: 20000,
      horizontalPosition: 'center',
      verticalPosition: 'top',
       panelClass: `matsnackbar-${msgType}`
    });
  }

}
