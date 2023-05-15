import { DateAndTimeUtil } from "../utils/dateAndTime.js";

/**
 * @param {string} csvText
 * @param {import("../types/Report.js").Report} report
 * @returns {import("../xlsx/types/worksheet.types.js").Workbook}
 */
export const buildXlsxData = (csvText, report) => {
  const last3Months = report.months.slice(-3);

  return {
    name: "sheetReport",
    sheets: [
      creatASheetForMonth(report.months[1]),
      getMainSheetFromCsv(csvText),
    ],
  };
};

/**
 * Creates a xlsx cell object for the sheet
 *
 * @param {number | string} data
 * @returns {import("../xlsx/types/worksheet.types.js").Cell}
 */
function c(data) {
  return {
    value: data,
    dataType: isNaN(+data) ? "string" : "number",
    style: {},
  };
}

/**
 * @param {import("../types/Month.js").Month} month
 * @returns {import("../xlsx/types/worksheet.types.js").Sheet}
 */
function creatASheetForMonth(month) {
  /** @type {import("../xlsx/types/worksheet.types.js").Row[]} */
  const rows = [{ cells: [] }];

  const monthName = month.MonthDate.toLocaleString("en-GB", {
    month: "long",
  });
  const yearName = month.MonthDate.getFullYear();
  rows.push({ cells: [c(`${monthName} ${yearName} Report`)] });
  rows.push({ cells: [] });
  rows.push({ cells: [c("Day"), c("Date"), c(" "), c("Session ")] });

  /** @type {import("../xlsx/types/worksheet.types.js").Sheet} */
  const sheet = { name: monthName, rows: rows };

  month.days.forEach((d) => {
    rows.push({
      cells: [
        c(`  ${d.dayDate.toLocaleDateString("en-GB", { weekday: "short" })}`),
        c(
          `${d.dayDate.getDate().toString()}.${month.MonthDate.getMonth() + 1}`
        ),
        c(" "),
        c("Sessions "),
      ],
    });
    d.workSessions.forEach((s) => {
      if (d) {
        rows.push({
          cells: [
            c(""),
            c(""),
            c(""),
            c(""),
            c(s.gitComments),
            c(s.startTime.getTime()),
            c(
              DateAndTimeUtil.getMinutesBetweenDates(s.startTime, s.finishTime)
            ),
          ],
        });
      }
    });
  });
  return sheet;
}

/**
 * Creates the main report from the csv data
 *
 * @param {string} csvText
 * @returns {import("../xlsx/types/worksheet.types.js").Sheet}
 */
function getMainSheetFromCsv(csvText) {
  const rows = csvText.split("\n");
  /** @type {import("../xlsx/types/worksheet.types.js").Sheet} */
  const firstSheet = { rows: [], name: "main_report" };
  rows.forEach((r, ri) => {
    /** @type {import("../xlsx/types/worksheet.types.js").Row} */
    const oneRow = { cells: [] };

    const cells = r.split(",");
    cells.forEach((cellData, ci) => {
      oneRow.cells.push(c(cellData));
    });
    firstSheet.rows.push(oneRow);
  });
  return { rows: firstSheet.rows, name: "main_report" };
}
