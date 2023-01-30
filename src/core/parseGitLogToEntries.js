import { DateAndTimeUtil } from '../utils/dateAndTime.js';

const GIT_LOG_SEPARATOR = '\n*';
/**
 *
 * @param {string }line
 * @return {import("../types/gitLogEntry.js").GitLogEntry}
 */
const gitLogLineToEntry = (line) => {
  const lineElements = line.split(' ');
  const date = lineElements[0];
  const time = lineElements[1];
  const timeZone = lineElements[2];
  const email = lineElements[3];
  const comment = lineElements.filter((elm, i) => i > 3).join(' ');
  const dateObj = DateAndTimeUtil.dateAndTimeToDateObj(date, time, timeZone);
  return {
    comment,
    date: dateObj,
    email,
  };
};
/**
 *
 * @param gitLogAsString
 * @return {import('../types/gitLogEntry.js').GitLogEntry[]}
 */
export const parseGitLogToEntries = (gitLogAsString) => {
  const lines = gitLogAsString.split(GIT_LOG_SEPARATOR);
  return lines.map((line) => gitLogLineToEntry(line));
};
