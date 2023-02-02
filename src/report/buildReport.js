import { buildDaysFromSessions } from './buildReportDays.js';
import { buildReportMonths } from './buildReportMonths.js';

/**
 *
 * @param {import("../types/workSession.js").WorkSession[]} workSessions
 * @param {import("../types/reportConfigurations.js").ReportConfigurations} configuration
 */
export const buildReportFromSession = (workSessions, configuration) => {
  const days = buildDaysFromSessions(workSessions, configuration);
  const months = buildReportMonths(days, configuration);
  return months;
};
