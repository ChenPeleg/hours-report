import { gitLogGetLog } from './core/gitLogGetLog.js';
import { parseGitLogToEntries } from './core/parseGitLogToEntries.js';
import { WorkSessionsBuild } from './core/workSessionsBuild.js';
import { getConfiguration } from './config/getConfigurations.js';
import { buildReportFromSession } from './report/buildReport.js';
import { exportReportToCsv } from './export/exportReportToCsv.js';

export const main = async () => {
  try {
    const config = getConfiguration(process.argv);
    const gitLogData = await gitLogGetLog(config);
    const logEntries = parseGitLogToEntries(gitLogData.gitLog);
    console.log(gitLogData.gitRepoName);
    const workSessions = WorkSessionsBuild(logEntries, config);
    const report = buildReportFromSession(
      workSessions,
      config,
      gitLogData.gitRepoName
    );
    // exportReportToCsv(report);

    // console.log(days);
    return logEntries;
  } catch (err) {
    console.error(err);
  }
};

main().then((results) => results);
