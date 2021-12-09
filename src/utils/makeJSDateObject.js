import dayjs from "dayjs";
import moment from "moment";
import { DateTime } from "luxon";

export default function makeJSDateObject(date) {
  if (date instanceof dayjs) {
    return date.clone().toDate();
  }
  if (moment.isMoment(date)) {
    return date.clone().toDate();
  }
  if (date instanceof DateTime) {
    return date.toJSDate();
  }
  if (date instanceof Date) {
    return new Date(date.getTime());
  }
  return date;
}
