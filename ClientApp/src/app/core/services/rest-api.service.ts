import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { APIResponse, AppointmentList } from 'src/app/appointment/appointment-object';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RestApiService {
  private apiURL: String;
  constructor(private httpClient: HttpClient) {
    this.apiURL = environment.baseUrl;
  }
  // doctors api
  public addDoctor(newDoctorDetails: any): Observable<any> {
    return this.httpClient.post<any>(`${this.apiURL}doctor/add`, newDoctorDetails);
  }
  public getDoctorsList(): Observable<any> {
    return this.httpClient.get<any>(`${this.apiURL}doctor/getdoctordetails`);
  }
  // users api
  public addUser(newUserDetails: any): Observable<any> {
    return this.httpClient.post<any>(`${this.apiURL}user/add`, newUserDetails);
  }
  public getUserById(user_id: any): Observable<APIResponse> {
    return this.httpClient.get<APIResponse>(`${this.apiURL}user/getuser/${user_id}`);
  }
  public getUsersList(): Observable<APIResponse> {
    return this.httpClient.get<APIResponse>(`${this.apiURL}user/getusersdetails`);
  }
  // slots api
  public addSlots(newSlotDetails: any): Observable<APIResponse> {
    return this.httpClient.post<APIResponse>(`${this.apiURL}slots/addslot`, newSlotDetails);
  }
  public filterSlotsList(filter_date: any): Observable<APIResponse> {
    return this.httpClient.get<APIResponse>(`${this.apiURL}slots/getslotlist/${filter_date}`);
  }
  // appointments api
  public bookAppointment(newAppointmentDetails: any): Observable<APIResponse> {
    return this.httpClient.post<APIResponse>(`${this.apiURL}slots/bookappointments`, newAppointmentDetails);
  }
  public getAppointmentsList(): Observable<APIResponse> {
    return this.httpClient.get<APIResponse>(`${this.apiURL}slots/getappointmentlist`);
  }
  public filterAppointmentsList(appointment_date: any): Observable<APIResponse> {
    return this.httpClient.get<APIResponse>(`${this.apiURL}slots/filterappointmentlist/${appointment_date}`);
  }
}
