
export interface AppointmentList {
  user_name: String
  email_id: String
  appoinment_date: Date
  phonenumber: Number
  address: String
  slot_mode: String
  from_time: String
  to_time: String

}
export interface APIResponse {
  error: boolean;
  message: string;
  data: any;

}

