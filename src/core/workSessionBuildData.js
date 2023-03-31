import { DateAndTimeUtil } from "../utils/dateAndTime.js";

/**
 * @param {import("../types/gitLogEntry.js").GitLogEntry[]} sessionEntries
 * @param {number} minuetsToAddToFirstCommit
 * @returns {import("../types/workSession.js").WorkSession}
 */
const buildWorkSessionWithData = (
  sessionEntries,
  minuetsToAddToFirstCommit
) => {
  const finishTime = sessionEntries.slice(-1)[0].date;
  const startTime = DateAndTimeUtil.subtractMinutesFromDate(
    sessionEntries[0].date,
    minuetsToAddToFirstCommit
  );
  const gitComments = sessionEntries
    .map((ent) => ent.comment.trim())
    .join("; ");
  const branches = Array.from(new Set(sessionEntries.map((ent) => ent.branch)));

  return {
    logEntries: sessionEntries,
    finishTime,
    startTime,
    gitComments,
    branches,
  };
};
/**
 * @param {{
 *   logEntries: import("../types/gitLogEntry.js").GitLogEntry[];
 * }[]} entryGroup
 * @param {number} minuetsToAddToFirstCommit
 * @returns {import("../types/workSession.js").WorkSession[]} }
 */
export const workSessionBuildData = (entryGroup, minuetsToAddToFirstCommit) =>
  entryGroup.map((group) =>
    buildWorkSessionWithData(group.logEntries, minuetsToAddToFirstCommit)
  );
