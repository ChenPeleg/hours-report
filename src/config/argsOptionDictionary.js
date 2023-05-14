/** @type {import("../types/reportConfigurations.js").CommandLineOption[]} */

export const ArgsOptionDictionary = [
  {
    name: "email",
    alias: "e",
    type: "string",
    helpText: "email address. Default: current git user email address",
    configOption: "Email",
  },
  {
    name: "max-diff-for-session",
    alias: "mx",
    type: "number",
    helpText:
      "maximum difference in minutes between commits counted to one session. Default: 120",
    configOption: "MaxDiffForSession",
  },
  {
    name: "min-session",
    alias: "mn",
    type: "number",
    helpText:
      "how many minutes the first commit of a session should add to total. Default: 30",
    configOption: "MinuetsToAddToFirstCommit",
  },
  {
    name: "date-from",
    alias: "df",
    type: "number",
    helpText:
      "Analyze data since certain date (git log format). default: always (with limit of 1000 rows)",
    configOption: "DateFrom",
  },
  {
    name: "date-until",
    alias: "du",
    type: "number",
    helpText: "Analyze data until certain date (git log format). default: now",
    configOption: "DateUntil",
  },
  {
    name: "format",
    alias: "fr",
    type: "string",
    helpText:
      "output format : 'csv' | 'console' | 'all'. Also there is an experimental 'xlsx' format that is not stable yet. . Default: 'csv'",
    configOption: "outputFormat",
  },
  {
    name: "output",
    alias: "o",
    type: "string",
    helpText: "output folder. Default: temp/hours-report",
    configOption: "outputFolder",
  },
  {
    name: "path",
    alias: "p",
    type: "string",
    helpText: "Git repository to analyze. Default: . (current folder)",
    configOption: "PathToRepo",
  },

  {
    name: "help",
    alias: "h",
    type: "string",
    helpText: "prints help options",
    configOption: "Help",
  },
];
