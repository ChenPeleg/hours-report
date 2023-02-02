import { buildCsvAsString } from './buildCsvAsString.js';

export const exportReportToCsv = (report) => {
  const csv = buildCsvAsString(report);
  console.log(csv);
};
