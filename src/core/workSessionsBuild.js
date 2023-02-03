import { groupEntriesToSessions } from './workSessionGroupEntries.js';
import { workSessionBuildData } from './workSessionBuildData.js';
import { gitLogAddBranchesToLogEntries } from './gitLogAddBranchesToLogEntries.js';

/**
 * @param {import("../types/gitLogEntry.js").GitLogEntry[] }logEntries
 * @param {import("../types/reportConfigurations.js").ReportConfigurations}config
 * @return {import("../types/workSession.js").WorkSession[]}
 */
export const WorkSessionsBuild = (logEntries, config) => {
  // They are sorted from start time (past) to end time (present)
  const sortedLogEntries = [...logEntries].sort(
    (a, b) => a.date.getTime() - b.date.getTime()
  );
  gitLogAddBranchesToLogEntries(sortedLogEntries);

  const basicSession = groupEntriesToSessions(
    sortedLogEntries,
    config.MaxDiffForSession
  );
  return workSessionBuildData(basicSession, config.MinuetsToAddToFirstCommit);
};
