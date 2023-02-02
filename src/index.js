import { getGitLog } from './core/getGitLog.js';
import { parseGitLogToEntries } from './core/parseGitLogToEntries.js';
import { WorkSessionsBuild } from './core/workSessionsBuild.js';
import { getConfiguration } from './config/getConfigurations.js';
import { buildReportFromSession } from './report/buildReport.js';

export const main = async () => {
  try {
    const config = getConfiguration(process.argv);
    const gitLogData = await getGitLog();
    const logEntries = parseGitLogToEntries(gitLogData.gitLog);
    const workSessions = WorkSessionsBuild(logEntries, config);
    const days = buildReportFromSession(workSessions, config);
    console.log(days);
    return logEntries;
  } catch (err) {
    console.error(err);
  }
};

main().then((results) => results);
