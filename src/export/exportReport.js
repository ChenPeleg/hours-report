import { buildCsvAsString } from './buildCsvAsString.js';
import { saveToCsvFile } from './saveToCsvFile.js';
import { exportReportToConsole } from './exportReportToConsole.js';
import { logToConsole } from '../utils/logToConsole.js';

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
    const fileLocation = await saveToCsvFile(csv, config);
    logToConsole(
      `Hours report exported successfully to \n file:///${fileLocation.replace(
        /\\/g,
        '/'
      )}`
    );

    logToConsole(
      `\n Link 2 to \n http://file:///C:/Projects/Sidur/build/index.html`
    );
  }
};
