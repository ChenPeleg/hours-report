import { logger } from "../utils/logger.js";

const CELLS_PER_ROW = 15;
const ROWS_LINE = "----------------";

/**
 * @param {string[] | any} cells
 * @returns {string[]}
 */
const buildSafeRow = (...cells) => {
  const makeDataSafe = (unsafeData) => {
    const rgx = /[,\n"\\\r]/g;
    if (rgx.test(unsafeData)) {
      let safe = unsafeData.replace(/"/g, "'");
      safe = safe.replace(/,/g, " ");
      return `"${safe}"`;
    }
    return unsafeData;
  };
  return cells.map((cell) => makeDataSafe(cell));
};
const limitCellLength = (rowAsString, separator = ";", maxLength = 100) => {
  const entries = rowAsString.split(separator);
  let finalString = "";
  for (const entry of entries) {
    if (finalString.length + entry.length > maxLength) {
      break;
    }
    finalString += entry + separator;
  }
  return finalString;
};
const roundHours = (minuets) => Math.ceil(minuets / 60);

/**
 * @param {import("../types/Report.js").Report} report
 * @returns {string}
 */
export const buildCsvAsString = (report) => {
  /** @type {string[][]} */
  let csvRows = [];
  const now = new Date();
  const r = (...args) => csvRows.push(buildSafeRow(...args));
  const addYear = (year) =>
    r(ROWS_LINE, `--| ${year} |--`, ROWS_LINE, ROWS_LINE) && r("");
  let currentYear = 0;
  const repoName = [report.repoName, ""];
  try {
    repoName[1] = report.repoName.split("/")[1];
    repoName[0] = report.repoName.split("/")[0];
  } catch (err) {
    logger.error(err);
  }

  r("Hours report ", "", report.repoName, "", "", "");
  r(
    `For: ${report.userEmail}`,
    "",
    "",
    "",
    `${now.getDate().toString()}.${now.getMonth() + 1}.${
      now.getFullYear() - 2000
    }`
  );
  const allHoursFromDaysWithRounding = report.months
    .map((m) => m.days)
    .flat()
    .map((d) => d.minuetSum)
    .map((h) => roundHours(h))
    .reduce((a, b) => a + b);
  r(
    "Total hours",
    "",

    report.months.map((m) => roundHours(m.minuetSum)).reduce((a, b) => a + b)
  );

  r("", "");

  report.months.forEach((month) => {
    const monthName = month.MonthDate.toLocaleString("en-GB", {
      month: "long",
    });
    if (month.MonthDate.getFullYear() !== currentYear) {
      currentYear = month.MonthDate.getFullYear();
      addYear(currentYear);
    }
    r(monthName, "   Day", "   Date", "   Hours", "   Details", " ");
    month.days.forEach((day) => {
      r(
        "",
        `  ${day.dayDate.toLocaleDateString("en-GB", { weekday: "short" })}`,
        `${day.dayDate.getDate().toString()}.${month.MonthDate.getMonth() + 1}`,
        roundHours(day.minuetSum).toString(),
        limitCellLength(`   ${day.comments}`)
      );
    });

    r(
      ROWS_LINE,
      ROWS_LINE,
      ROWS_LINE,
      ROWS_LINE,
      ROWS_LINE,
      ROWS_LINE,
      `Total:`,
      roundHours(month.minuetSum).toString()
    );
    r("", "");
  });

  const textRows = csvRows.map((row) => {
    for (let c = row.length; c < CELLS_PER_ROW; c++) {}
    return row.join();
  });
  return textRows.join("\n");
};
