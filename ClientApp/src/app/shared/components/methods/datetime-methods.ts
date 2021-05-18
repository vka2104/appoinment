export function getFormatedDate(dateVal: Date) {
  let year = new Intl.DateTimeFormat('en', { year: 'numeric' }).format(dateVal);
  let month = new Intl.DateTimeFormat('en', { month: '2-digit' }).format(dateVal);
  let day = new Intl.DateTimeFormat('en', { day: '2-digit' }).format(dateVal);
  return `${year}-${month}-${day}`;
}

export function getFormatedTime(dateTimeVal: Date) {
  let from_hour = (new Intl.DateTimeFormat('en', { hour: '2-digit' }).format(dateTimeVal)).split(' ')[0];
  let from_minutes = new Intl.DateTimeFormat('en', { minute: '2-digit' }).format(dateTimeVal);
  let from_timeStamp = (new Intl.DateTimeFormat('en', { hour: '2-digit' }).format(dateTimeVal)).split(' ')[1];
  return `${from_hour}:${(from_minutes).toString() === '0'?'00': from_minutes} ${from_timeStamp}`;
}

export function getDateTimeDifference(fromDate: any, toDate: any) {
  let diff = toDate - fromDate;
  var msec = diff;
  var hours = Math.floor(msec / 1000 / 60 / 60);
  msec -= hours * 1000 * 60 * 60;
  var minutes = Math.floor(msec / 1000 / 60);
  msec -= minutes * 1000 * 60;
  var seconds = Math.floor(msec / 1000);
  msec -= seconds * 1000;
  return {
    hours,
    minutes,
    seconds,
    msec
  }
}
