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

export const DateAndTimeUtil = {
  dateAndTimeToDateObj: dateAndTimeToDateObj,
};
