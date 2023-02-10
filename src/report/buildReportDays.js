import { DateAndTimeUtil } from '../utils/dateAndTime.js';

/**
 * @param {import('../types/Day.js').Day} day
 * @returns {import('../types/Day.js').Day}
 */

const buildDayData = (day) => {
  const dayWithData = { ...day };
  dayWithData.dayDate = day.workSessions[0].startTime;
  dayWithData.minuetSum = day.workSessions
    .map((session) =>
      DateAndTimeUtil.getMinutesBetweenDates(
        session.startTime,
        session.finishTime
      )
    )
    .reduce((a, b) => a + b, 0);
  const dayBranches = new Set();
  day.workSessions.forEach((s) => {
    s.branches.forEach((b) => dayBranches.add(b.trim()));
  });
  dayWithData.comments = Array.from(dayBranches)
    .filter((b) => b.trim())
    .join('; ');
  dayWithData.comments = dayWithData.comments.replace(/_/g, ' ').trim();
  if (!dayWithData.comments) {
    dayWithData.comments = day.workSessions
      .map((ws) => ws.gitComments.trim())
      .join('; ');
  }
  return dayWithData;
};

/**
 * @param {import('../types/workSession.js').WorkSession[]} workSessions
 * @param {import('../types/reportConfigurations.js').ReportConfigurations} configuration
 * @returns {import('../types/Day.js').Day[]}
 */
export const buildDaysFromSessions = (workSessions, configuration) => {
  /** @type {import('../types/Day.js').Day} */
  const EmptyDay = {
    workSessions: [],
    dayDate: new Date(),
    comments: '',
    minuetSum: 0,
  };
  /** @type {import('../types/Day.js').Day[]} */
  let allDays = [];
  /** @type {import('../types/Day.js').Day} */
  let CurrentDay = { ...EmptyDay, workSessions: [] };
  /** @type {import('../types/workSession.js').WorkSession} */
  let lastSession;
  for (let session of workSessions) {
    if (
      !lastSession ||
      DateAndTimeUtil.datesAreOnSameDay(
        lastSession ? lastSession.startTime : undefined,
        session.startTime
      )
    ) {
      CurrentDay.workSessions.push(session);
    } else if (lastSession) {
      allDays.push(CurrentDay);
      CurrentDay = { ...EmptyDay, workSessions: [] };
      CurrentDay.workSessions.push(session);
    }
    lastSession = session;
  }
  if (CurrentDay.workSessions.length) {
    allDays.push(CurrentDay);
  }

  return allDays.map((d) => buildDayData(d));
};
