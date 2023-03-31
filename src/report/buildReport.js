import { buildDaysFromSessions } from "./buildReportDays.js";
import { buildReportMonths } from "./buildReportMonths.js";

/**
 * @param {import("../types/workSession.js").WorkSession[]} workSessions
 * @param {import("../types/reportConfigurations.js").ReportConfigurations} configuration
 * @param {string} repoName
 * @returns {import("../types/Report.js").Report}
 */

export const buildReportFromSession = (
  workSessions,
  configuration,
  repoName
) => {
  const days = buildDaysFromSessions(workSessions, configuration);
  const months = buildReportMonths(days, configuration);
  return {
    months,
    minuetSum: months.map((m) => m.minuetSum).reduce((a, b) => a + b, 0),
    repoName,
    userEmail: configuration.Email,
  };
};
