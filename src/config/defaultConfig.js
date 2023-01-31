/**
 * @type {import("../types/reportConfigurations.js").ReportConfigurations}
 */
export const defaultConfig = {
  MaxDiffForSession: 120,
  MinimumSessionMinuets: 30,
  DateFrom: new Date(),
  DateUntil: new Date(),
  Email: null,
  PathToRepo: '.',
  output: 'all',
};
