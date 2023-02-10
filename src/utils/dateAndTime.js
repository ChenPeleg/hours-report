/**
 * @param {Date} first
 * @param {Date} second
 * @returns {boolean}
 */
const datesAreOnSameDay = (first, second) =>
  first.getFullYear() === second.getFullYear() &&
  first.getMonth() === second.getMonth() &&
  first.getDate() === second.getDate();

/**
 * @param {Date} first
 * @param {Date} second
 * @returns {boolean}
 */
const datesAreOnSameMonth = (first, second) =>
  first.getFullYear() === second.getFullYear() &&
  first.getMonth() === second.getMonth();
/**
 * Uses Ecmascript date format YYYY-MM-DDTHH:mm:ss.sssZ if no offset is
 * specified that this returns
 *
 * @param date
 * @param time
 * @param offset
 * @returns {Date}
 */
const dateAndTimeToDateObj = (date, time, offset = 'Z') => {
  if (!date) {
    throw 'Date is missing';
  }
  return new Date(`${date}T${time}${offset}`);
};
/**
 * @param {Date} startDate
 * @param {Date} endDate
 * @returns {number}
 */
const getMinutesBetweenDates = (startDate, endDate) => {
  const diff = endDate.getTime() - startDate.getTime();
  return diff / 60000;
};
/**
 * @param {Date} date
 * @param {number} minuets
 */
const subtractMinutesFromDate = (date, minuets) => {
  return new Date(date.getTime() - 1000 * 60 * minuets);
};

export const DateAndTimeUtil = {
  datesAreOnSameMonth,
  datesAreOnSameDay,
  getMinutesBetweenDates,
  dateAndTimeToDateObj,
  subtractMinutesFromDate,
};
