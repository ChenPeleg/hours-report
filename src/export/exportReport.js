import {buildCsvAsString} from './buildCsvAsString.js';
import {saveToCsvFile} from './saveToCsvFile.js';

/**
 *
 * @param report
 * @param config
 */
export const exportReport = (report, config) => {

  const csv = buildCsvAsString(report);
  if (config.output === 'csv' || config.output === 'all') {
    saveToCsvFile(csv, report).then(r => r);
  }
  if (config.output === 'csv' || config.output === 'all') {
    saveToCsvFile(csv, report).then(r => r);
  }

};
