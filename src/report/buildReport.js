/**
 *
 * @param {import("../types/workSession.js").WorkSession[]} workSessions
 * @param {import("../types/reportConfigurations.js").ReportConfigurations} configuration
 * @return {import("../types/Day.js").Day [] }
 */
const buildDaysFromSessions = (workSessions, configuration) => {
  /** @type {import("../types/Day.js").Day [] } */
  let allDays = [];
  /** @type {import("../types/Day.js").Day   } */
  let CurrentDay = {
    workSessions: [],
    dateAsNumber: 0,
    comments: '',
    hoursSum: 0,
  };
  /** @type {import("../types/workSession.js").WorkSession } */
  let lastSession;
  for (let session in workSessions) {
    if (lastSession) {
    } else {
    }
  }
  return allDays;
};

/**
 *
 * @param {import("../types/workSession.js").WorkSession[]} workSessions
 * @param {import("../types/reportConfigurations.js").ReportConfigurations} configuration
 */
const buildReportFromSession = (workSessions, configuration) => {};
