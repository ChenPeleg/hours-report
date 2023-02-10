import { DateAndTimeUtil } from '../utils/dateAndTime.js';

/**
 * @param {import('../types/gitLogEntry.js').GitLogEntry[]} logEntries
 * @param {number} maxDiffForSession
 * @returns {{
 *   logEntries: import('../types/gitLogEntry.js').GitLogEntry[];
 * }[]}
 */
export const groupEntriesToSessions = (logEntries, maxDiffForSession) => {
  /**
   * @type {{
   *   logEntries: import('../types/gitLogEntry.js').GitLogEntry[];
   * }[]}
   */
  const basicSession = [];

  /** @type {import('../types/gitLogEntry.js').GitLogEntry} */
  let lastEntry;
  /**
   * @type {{
   *   logEntries: import('../types/gitLogEntry.js').GitLogEntry[];
   * }}
   */
  let currentSession = { logEntries: [] };
  for (let entry of logEntries) {
    if (lastEntry) {
      const diffFromLast = DateAndTimeUtil.getMinutesBetweenDates(
        lastEntry.date,
        entry.date
      );
      if (diffFromLast < maxDiffForSession) {
        currentSession.logEntries.push(entry);
      } else {
        basicSession.push({ ...currentSession });
        currentSession = { logEntries: [entry] };
      }
    } else {
      currentSession.logEntries.push(entry);
    }
    lastEntry = entry;
  }
  basicSession.push(currentSession);
  return basicSession;
};
