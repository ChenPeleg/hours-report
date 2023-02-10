import { appendFileSync, existsSync, mkdirSync, writeFileSync } from 'fs';
import path from 'path';
import { tmpdir } from 'os';
import { veryBasicHash } from '../utils/veryBasicHash.js';
import { exportLogs } from './exportLogs.js';

/**
 * @param {string} csvText
 * @param {import('../types/reportConfigurations.js').ReportConfigurations} config
 * @returns {Promise<string>}
 */
export const saveToCsvFile = async (csvText, config) => {
  const fileHash = veryBasicHash(csvText);
  const fileName = `hours-report-` + fileHash;
  const reportFolderPath = config.outputFolder
    ? path.resolve('./', config.outputFolder)
    : path.resolve(tmpdir(), `./hours-report-${fileHash}/`);
  const reportLogsFolderPath = path.resolve(reportFolderPath, fileHash);
  if (!existsSync(reportFolderPath)) {
    mkdirSync(reportFolderPath);
  }
  if (!existsSync(reportLogsFolderPath)) {
    mkdirSync(reportLogsFolderPath);
  }
  const reportFilePath = path.resolve(reportFolderPath, `${fileName}.csv`);

  writeFileSync(reportFilePath, csvText);
  exportLogs(reportLogsFolderPath);
  return reportLogsFolderPath;
};
