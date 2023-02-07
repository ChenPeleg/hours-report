#! /usr/bin/env node

import { gitLogGetLog } from './core/gitLogGetLog.js';
import { WorkSessionsBuild } from './core/workSessionsBuild.js';
import { getConfiguration } from './config/getConfigurations.js';
import { buildReportFromSession } from './report/buildReport.js';
import { parseGitLogToEntries } from './core/gitLogParseToEntries.js';
import { printHelpText } from './config/printHelpText.js';
import { exportReport } from './export/exportReport.js';
import { exportLogs } from './export/exportLogs.js';
import { logToConsole } from './utils/logToConsole.js';
import { logger } from './utils/logger.js';

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
    await exportReport(report, config);
  } catch (err) {
    logger.error(err);
    console.error(err);
    logToConsole(
      'For more information visit https://chenpeleg.github.io/hours-report/.'
    );
  } finally {
    // for debugging
    // exportLogs('./logs');
  }
};

main().then((results) => results);
