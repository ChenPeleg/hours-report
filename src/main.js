import { getGitLog } from './core/getGitLog.js';
import { parseGitLogToEntries } from './core/parseGitLogToEntries.js';

export const main = async () => {
  try {
    const gitLogData = await getGitLog();
    const logEntries = parseGitLogToEntries(gitLogData.gitLog);
    return logEntries;
  } catch (err) {
    console.error(err);
  }
};
