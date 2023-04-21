import moment from "moment";

export function formatDateAndTime(start, end) {
  const startDate = new Date(start);
  const endDate = new Date(end);
  const startDateString = startDate.toLocaleDateString();
  const startTimeString = startDate.toLocaleTimeString();
  const endDateString = endDate.toLocaleDateString();
  const endTimeString = endDate.toLocaleTimeString();

  if (startDateString === endDateString) {
    return `${startDateString} ${startTimeString} - ${endTimeString}`;
  } else {
    return `${startDateString} ${startTimeString} - ${endDateString} ${endTimeString}`;
  }
}

export function isToday(date) {
  return moment().isSame(moment(date), "day");
}