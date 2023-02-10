import { DateAndTimeUtil } from '../utils/dateAndTime.js';

/**
 * @param {import('../types/Month.js').Month} month
 * @returns {import('../types/Month.js').Month}
 */

const buildMonthData = (month) => {
  const monthWithData = { ...month };
  monthWithData.MonthDate = month.days[0].workSessions[0].startTime;
  monthWithData.minuetSum = month.days
    .map((d) => d.minuetSum)
    .reduce((a, b) => a + b, 0);

  return monthWithData;
};

/**
 * @param {import('../types/Day.js').Day[]} days
 * @param {import('../types/reportConfigurations.js').ReportConfigurations} configuration
 * @returns {import('../types/Month.js').Month[]}
 */

export const buildReportMonths = (days, configuration) => {
  /** @type {import('../types/Month.js').Month} */
  const EmptyMonth = {
    days: [],
    minuetSum: 0,
    MonthDate: new Date(),
    comments: '',
  };
  /** @type {import('../types/Month.js').Month[]} */
  let allMonths = [];
  /** @type {import('../types/Month.js').Month} */
  let CurrentMonth = { ...EmptyMonth, days: [] };
  /** @type {import('../types/Day.js').Day} */
  let lastDay;
  for (let day of days) {
    if (
      !lastDay ||
      DateAndTimeUtil.datesAreOnSameMonth(
        day.workSessions[0].startTime,
        lastDay.workSessions[0].startTime
      )
    ) {
      CurrentMonth.days.push(day);
    } else if (lastDay) {
      allMonths.push(CurrentMonth);
      CurrentMonth = { ...EmptyMonth, days: [] };
      CurrentMonth.days.push(day);
    }
    lastDay = day;
  }
  if (CurrentMonth.days.length) {
    allMonths.push(CurrentMonth);
  }
  return allMonths.map((m) => buildMonthData(m));
};
