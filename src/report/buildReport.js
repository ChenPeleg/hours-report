import { buildDaysFromSessions } from './buildReportDays.js';

/**
 *
 * @param {import("../types/workSession.js").WorkSession[]} workSessions
 * @param {import("../types/reportConfigurations.js").ReportConfigurations} configuration
 */
export const buildReportFromSession = (workSessions, configuration) => {
  const days = buildDaysFromSessions(workSessions, configuration);
  return days;
};
