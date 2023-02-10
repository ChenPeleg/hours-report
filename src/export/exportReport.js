import { buildCsvAsString } from './buildCsvAsString.js';
import { saveToCsvFile } from './saveToCsvFile.js';
import { exportReportToConsole } from './exportReportToConsole.js';
import { logToConsole } from '../utils/logToConsole.js';
import { logger } from '../utils/logger.js';
import { openExplorerIn } from '../utils/open-explorer.js';

/**
 * @param report
 * @param {import('../types/reportConfigurations.js').ReportConfigurations} config
 */
export const exportReport = async (report, config) => {
  let fileLocation;
  const csv = buildCsvAsString(report);
  if (config.outputFormat === 'console' || config.outputFormat === 'all') {
    await exportReportToConsole(csv);
  }
  if (config.outputFormat === 'csv' || config.outputFormat === 'all') {
    fileLocation = await saveToCsvFile(csv, config);
    logToConsole(
      `Hours report exported successfully to \n file:///${fileLocation.replace(
        /\\/g,
        '/'
      )}`
    );
    setTimeout(() => openExplorerIn(fileLocation), 1000);
  }
  logger.info(
    'exportReport success',
    'format:',
    JSON.stringify(config),
    fileLocation ? 'location: ' + fileLocation : ''
  );
};
