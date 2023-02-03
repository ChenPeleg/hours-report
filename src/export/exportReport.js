import { buildCsvAsString } from './buildCsvAsString.js';
import { saveToCsvFile } from './saveToCsvFile.js';
import { exportReportToConsole } from './exportReportToConsole.js';

/**
 *
 * @param report
 * @param config
 */
export const exportReport = async (report, config) => {
  const csv = buildCsvAsString(report);
  if (config.output === 'csv' || config.output === 'all') {
    await exportReportToConsole(csv);
  }
  if (config.output === 'csv' || config.output === 'all') {
    await saveToCsvFile(csv, report);
  }
};
