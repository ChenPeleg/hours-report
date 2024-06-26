/** @type {import("../types/reportConfigurations.js").ReportConfigurations} */
export const defaultConfig = {
  MaxDiffForSession: 120,
  MinuetsToAddToFirstCommit: 30,
  DateFrom: null,
  DateUntil: null,
  Email: null,
  PathToRepo: ".",
  outputFormat: "xlsx",
  outputFolder: "",
  debug: false,
  priorityCommentPattern: "# ",
};
