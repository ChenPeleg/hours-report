import { gitLogGetLog } from './core/gitLogGetLog.js';
import { WorkSessionsBuild } from './core/workSessionsBuild.js';
import { getConfiguration } from './config/getConfigurations.js';
import { buildReportFromSession } from './report/buildReport.js';
import { parseGitLogToEntries } from './core/gitLogParseToEntries.js';
import { exportReportToCsv } from './export/exportReportToCsv.js';
import { printHelpText } from './config/printHelpText.js';
import { exportReportToConsole } from './export/exportReportToConsole.js';
import { exportReport } from './export/exportReport.js';

export const main = async () => {
  try {
    const { config, printHelp } = getConfiguration(process.argv);
    if (printHelp) {
      printHelpText();
      return;
    }
    const gitLogData = await gitLogGetLog(config);
    const logEntries = parseGitLogToEntries(gitLogData.gitLog);

    const workSessions = WorkSessionsBuild(logEntries, config);
    const report = buildReportFromSession(
      workSessions,
      config,
      gitLogData.gitRepoName
    );

    //exportReportToCsv(report);
    exportReport(report, config);

    return logEntries;
  } catch (err) {
    console.error(err);
  }
};

main().then((results) => results);
