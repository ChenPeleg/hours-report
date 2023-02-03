import {DateAndTimeUtil} from '../utils/dateAndTime.js';
import {appConstants} from '../config/constants.js';

const GIT_LOG_SEPARATOR = '\n*';
/**
 * @param {string }line
 * @return {import("../types/gitLogEntry.js").GitLogEntry}
 */
const gitLogLineToEntry = (line) => {
  try {
    const lineElements = line.split(' ');
    const date = lineElements[0];
    const time = lineElements[1];
    const timeZone = lineElements[2];
    const email = lineElements[3];
    const commentsAndRefs = lineElements.filter((elm, i) => i > 3).join(' ');

    const comment = commentsAndRefs.split(appConstants.refsIndicator)[0]
    const branch = commentsAndRefs.split(appConstants.refsIndicator)[1];

    const dateObj = DateAndTimeUtil.dateAndTimeToDateObj(date, time, timeZone);
    return {
      comment,
      date: dateObj,
      email,
      branch,
    };
  } catch (err) {
    throw `gitLogLineToEntry error ${err.toString()} line: ${line}`;
  }
};
/**
 *
 * @param gitLogAsString
 * @return {import('../types/gitLogEntry.js').GitLogEntry[]}
 */
export const parseGitLogToEntries = (gitLogAsString) => {
  const lines = gitLogAsString.split(GIT_LOG_SEPARATOR);
  lines[0] = lines[0].replace('*', '');

  return lines
      .filter((l) => l.trim())
      .map((line) => gitLogLineToEntry(line.trim()));
};
