/**
 *
 * @param {Date} first
 * @param {Date} second
 * @return {boolean}
 */
const datesAreOnSameDay = (first, second) =>
    first.getFullYear() === second.getFullYear() &&
    first.getMonth() === second.getMonth() &&
    first.getDate() === second.getDate();


/**
 * Uses Ecmascript date format YYYY-MM-DDTHH:mm:ss.sssZ
 * if no offset is specified that this returns
 * @param date
 * @param time
 * @param offset
 * @return {Date}
 *
 */
const dateAndTimeToDateObj = (date, time, offset = 'Z') => {
  if (!date) {
    throw 'Date is missing';
  }
  return new Date(`${date}T${time}${offset}`);
};
/**
 *
 * @param {Date}startDate
 * @param {Date}endDate
 * @return {number}
 */
const getMinutesBetweenDates = (startDate, endDate) => {
  const diff = endDate.getTime() - startDate.getTime();
  return diff / 60000;
};
/**
 *
 * @param  {Date} date
 * @param { number }minuets
 */
const subtractMinutesFromDate = (date, minuets) => {
  return new Date(date.getTime() - 1000 * 60 * minuets);
};

export const DateAndTimeUtil = {
  datesAreOnSameDay,
  getMinutesBetweenDates,
  dateAndTimeToDateObj,
  subtractMinutesFromDate,
};
