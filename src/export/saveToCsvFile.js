import { appendFileSync, existsSync, mkdirSync } from 'fs';
import path from 'path';
import { tmpdir } from 'os';

/**
 * @param { string } csvText
 * @param {import('../types/reportConfigurations.js').ReportConfigurations} config
 * @return {Promise<string>}
 */
export const saveToCsvFile = async (csvText, config) => {
  const fileName = `hours-report` + ((Math.random() * 1000) | 0);
  const dirToSaveFile = tmpdir();
  const reportFolderPath = path.resolve(dirToSaveFile, `./hours-report/`);
  if (!existsSync(reportFolderPath)) {
    mkdirSync(reportFolderPath);
  }
  const reportFilePath = path.resolve(reportFolderPath, `${fileName}.csv`);

  appendFileSync(reportFilePath, csvText);
  return reportFilePath;
};
