import { buildCsvAsString } from './buildCsvAsString.js';
import { saveToCsvFile } from './saveToCsvFile.js';
import { exportReportToConsole } from './exportReportToConsole.js';
import { logToConsole } from '../utils/logToConsole.js';

/**
 * @param {import('../types/reportConfigurations.js').ReportConfigurations} config
 */
export const exportLogs = async (config) => {
  if (config.output === 'csv') {
    // await exportReportToConsole(csv);
  }
};
