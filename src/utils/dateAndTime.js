//
/**
 * Uses Ecmascript date format YYYY-MM-DDTHH:mm:ss.sssZ
 * if no offset is specified that this returns
 * @param year
 * @param time
 * @param offset
 * @return {Date}
 *
 */
const yearAndDateToDateObj = (year, time, offset = 'Z') => {
 return new Date(`${year}T${time}${offset}`);
};

export const DateAndTimeUtil = {
 yearAndDateToDateObj,
};
