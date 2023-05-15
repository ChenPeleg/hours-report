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
  rows.push({
    cells: [
      c("Day"),
      c("Date"),
      c(" "),
      c("Sessions "),
      c("Start hour "),
      c("Hours"),
    ],
  });
  rows[rows.length - 1].height = 45;
  rows[rows.length - 1].cells.forEach(
    (c) =>
      (c.style.border = [
        { width: "thick", position: "bottom", color: "#000000" },
      ])
  );
  rows.forEach((r) => r.cells.forEach((c) => (c.style.font = { bold: true })));

  /** @type {import("../xlsx/types/worksheet.types.js").Sheet} */
  const sheet = { name: monthName, rows: rows };

  month.days.forEach((d) => {
    const lastRowIndex = rows.push({
      cells: [
        c(`  ${d.dayDate.toLocaleDateString("en-GB", { weekday: "short" })}`),
        c(
          `${d.dayDate.getDate().toString()}.${month.MonthDate.getMonth() + 1}`
        ),
        c(""),
      ],
    });

    d.workSessions.forEach((s, i) => {
      const sessionCells = [
        c(s.gitComments),
        c(
          `   ${s.startTime.getHours()}:${s.startTime
            .getMinutes()
            .toString()
            .padStart(1, "0")}   `
        ),
        c(
          (
            DateAndTimeUtil.getMinutesBetweenDates(s.startTime, s.finishTime) /
            60
          ).toFixed(1)
        ),
      ];
      if (i === 0) {
        rows[lastRowIndex - 1].cells =
          rows[lastRowIndex - 1].cells.concat(sessionCells);
      } else {
        rows.push({
          cells: [c(""), c(""), c("")].concat(sessionCells),
        });
      }
    });
  });
  sheet.columnWidth = [5, 5, 5, 30, 5, 5];
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
