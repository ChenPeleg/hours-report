#! /usr/bin/env node

import { gitLogGetLog } from './core/gitLogGetLog.js';
import { WorkSessionsBuild } from './core/workSessionsBuild.js';
import { getConfiguration } from './config/getConfigurations.js';
import { buildReportFromSession } from './report/buildReport.js';
import { parseGitLogToEntries } from './core/gitLogParseToEntries.js';
import { printHelpText } from './config/printHelpText.js';
import { exportReport } from './export/exportReport.js';
import { veryBasicHash } from './utils/veryBasicHash.js';
import { atob, btoa } from 'buffer';

export const main = async () => {
  try {
    const { config, printHelp } = getConfiguration(process.argv);
    const res = veryBasicHash('fasdfasdfagsdg3333dfsgfasdf');
    console.log(res);
    const b64 = Buffer.from(res).toString('base64');
    const ab = atob(res);
    console.log(ab);

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
    console.error(err);
  }
};

main().then((results) => results);
