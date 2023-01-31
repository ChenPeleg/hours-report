import { getGitLog } from './core/getGitLog.js';
import { parseGitLogToEntries } from './core/parseGitLogToEntries.js';
import { LogEntriesToWorkSessions } from './core/logEntriesToWorkSessions.js';
import { GetConfiguration } from './config/getConfigurations.js';

export const main = async () => {
  try {
    const config = GetConfiguration(process.argv);
    const gitLogData = await getGitLog();
    const logEntries = parseGitLogToEntries(gitLogData.gitLog);
    const buildWorkSessionsFromEntries = LogEntriesToWorkSessions(
      logEntries,
      config
    );
    return logEntries;
  } catch (err) {
    console.error(err);
  }
};
