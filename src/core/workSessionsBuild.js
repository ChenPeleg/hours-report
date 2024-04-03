import { groupEntriesToSessions } from "./workSessionGroupEntries.js";
import { workSessionBuildData } from "./workSessionBuildData.js";
import { gitLogAddBranchesToLogEntries } from "./gitLogAddBranchesToLogEntries.js";
import { logger } from "../utils/logger.js";

/**
 * @param {import("../types/gitLogEntry.js").GitLogEntry[]} logEntries
 * @param {import("../types/reportConfigurations.js").ReportConfigurations} config
 * @returns {import("../types/workSession.js").WorkSession[]}
 */

export const WorkSessionsBuild = (logEntries, config) => {
  // They are sorted from start time (past) to end time (present)
  const sortedLogEntries = [...logEntries].sort(
    (a, b) => a.date.getTime() - b.date.getTime()
  );
  // if (config.priorityCommentPattern) {
  //   const highPriorityComment = sortedLogEntries.filter((ent) =>
  //     ent.comment?.includes(config.priorityCommentPattern)
  //   );
  // }

  logger.info(`workSessionBuildData recieved ${logEntries.length} log entries`);
  logger.debug(
    `all  logEntries ${logEntries
      .map((le) => `${le.date} ${le.branch} ${le.comment}`)
      .join("; \n")} `
  );
  gitLogAddBranchesToLogEntries(sortedLogEntries);

  const basicSession = groupEntriesToSessions(
    sortedLogEntries,
    config.MaxDiffForSession
  );
  logger.info(`workSessionBuildData grouped ${basicSession.length} sessions`);
  return workSessionBuildData(basicSession, config.MinuetsToAddToFirstCommit);
};
