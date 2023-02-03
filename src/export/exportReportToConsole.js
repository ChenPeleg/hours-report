import { buildCsvAsString } from './buildCsvAsString.js';
import { saveToCsvFile } from './saveToCsvFile.js';
import { logToConsole } from '../utils/logToConsole.js';

export const exportReportToConsole = (report) => {
  const csv = buildCsvAsString(report);
  logToConsole(csv);
};
