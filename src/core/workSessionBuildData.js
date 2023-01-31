import { DateAndTimeUtil } from '../utils/dateAndTime.js';

/**
 * @param { import("../types/gitLogEntry.js").GitLogEntry[]} sessionEntries
 * @param { number } minuetsToAddToFirstCommit
 * @return { import("../types/workSession.js").WorkSession}
 */
const buildLogEntryWithData = (sessionEntries, minuetsToAddToFirstCommit) => {
  const finishTime = sessionEntries.slice(-1)[0].date;
  const startTime = DateAndTimeUtil.subtractMinutesFromDate(
    sessionEntries[0].date,
    minuetsToAddToFirstCommit
  );
  const gitComments = sessionEntries.map((ent) => ent.comment).join(', ');
  return {
    logEntries: sessionEntries,
    finishTime,
    startTime,
    gitComments,
    otherComments: '',
  };
};
/**
 * @param {{logEntries: import("../types/gitLogEntry.js").GitLogEntry[]} []} entryGroup
 * @param { number } minuetsToAddToFirstCommit
 * @return {import("../types/workSession.js").WorkSession[]}}
 */
export const workSessionBuildData = (entryGroup, minuetsToAddToFirstCommit) =>
  entryGroup.map((group) =>
    buildLogEntryWithData(group.logEntries, minuetsToAddToFirstCommit)
  );
