import { getGitLog } from './core/getGitLog.js';
import { parseGitLogToEntries } from './core/parseGitLogToEntries.js';
import { WorkSessionsBuild } from './core/workSessionsBuild.js';
import { getConfiguration } from './config/getConfigurations.js';

export const main = async () => {
  try {
    const config = getConfiguration(process.argv);
    const gitLogData = await getGitLog();
    const logEntries = parseGitLogToEntries(gitLogData.gitLog);
    const buildWorkSessionsFromEntries = WorkSessionsBuild(logEntries, config);
    return logEntries;
  } catch (err) {
    console.error(err);
  }
};
