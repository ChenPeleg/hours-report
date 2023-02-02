import { DateAndTimeUtil } from '../utils/dateAndTime.js';

/**
 * @param{import("../types/Day.js").Day   }day
 * @return {import("../types/Day.js").Day   }
 */
const buildDayData = (day) => {
  const dayWithData = { ...day };
  dayWithData.dateAsNumber = day.workSessions[0].startTime.getDate();
  dayWithData.minuetSum = day.workSessions
    .map((session) =>
      DateAndTimeUtil.getMinutesBetweenDates(
        session.startTime,
        session.finishTime
      )
    )
    .reduce((a, b) => a + b, 0);
  return dayWithData;
};

/**
 * @param {import("../types/workSession.js").WorkSession[]} workSessions
 * @param {import("../types/reportConfigurations.js").ReportConfigurations} configuration
 * @return {import("../types/Day.js").Day [] }
 */
const buildDaysFromSessions = (workSessions, configuration) => {
  const EmptyDay = {
    workSessions: [],
    dateAsNumber: 0,
    comments: '',
    minuetSum: 0,
  };
  /** @type {import("../types/Day.js").Day [] } */
  let allDays = [];
  /** @type {import("../types/Day.js").Day   } */
  let CurrentDay = { ...EmptyDay, workSessions: [] };
  /** @type {import("../types/workSession.js").WorkSession } */
  let lastSession;
  for (let session of workSessions) {
    if (
      lastSession?.startTime.getDate() === session.startTime.getDate() ||
      !lastSession
    ) {
      CurrentDay.workSessions.push(session);
    } else if (lastSession) {
      allDays.push(CurrentDay);
      CurrentDay = { ...EmptyDay, workSessions: [] };
      CurrentDay.workSessions.push(session);
    }
    lastSession = session;
  }
  return allDays;
};

/**
 *
 * @param {import("../types/workSession.js").WorkSession[]} workSessions
 * @param {import("../types/reportConfigurations.js").ReportConfigurations} configuration
 */
const buildReportFromSession = (workSessions, configuration) => {};
