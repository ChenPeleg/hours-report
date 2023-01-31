//
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
 * @param {Date}startDate
 * @param {Date}endDate
 * @return {number}
 */
const getMinutesBetweenDates = (startDate, endDate) => {
  const diff = endDate.getTime() - startDate.getTime();
  return diff / 60000;
};

export const DateAndTimeUtil = {
  getMinutesBetweenDates,
  dateAndTimeToDateObj,
};
