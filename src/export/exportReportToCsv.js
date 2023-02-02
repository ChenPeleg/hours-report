import { buildCsvAsString } from './buildCsvAsString.js';
import { saveToCsvFile } from './saveToCsvFile.js';

export const exportReportToCsv = (report) => {
  const csv = buildCsvAsString(report);
  saveToCsvFile(csv, report);
};
