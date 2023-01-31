/**
 * @param {import("../types/gitLogEntry.js").GitLogEntry[] }logEntries
 * @param {import("../types/reportConfigurations.js").ReportConfigurations}config
 * @return {import("../types/workSession.js").WorkSession[]}
 */
export const LogEntriesToWorkSessions = (logEntries, config) => {
  /** @type {import("../types/workSession.js").WorkSession[]} */
  const workSessions = [];

  const sortedLogEntries = [...logEntries].sort(
    (a, b) => a.date.getTime() - b.date.getTime()
  );

  return workSessions;
};
