/**
 * @param {string} csvText
 * @param {import("../types/Report.js").Report} report
 * @returns {import("../xlsx/types/worksheet.types.js").Workbook}
 */
export const buildXlsxData = (csvText, report) => {
  const last3Months = report.months.slice(-3);

  return {
    name: "sheetReport",
    sheets: [getMainSheetFromCsv(csvText), creatASheetForMonth(last3Months[0])],
  };
};

/**
 * Creates a xlsx cell object
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

  /** @type {import("../xlsx/types/worksheet.types.js").Sheet} */
  const sheet = { name: monthName, rows: rows };

  month.days.forEach((d) => {
    d.workSessions.forEach((s) => {
      if (d) {
        rows.push({ cells: [c(d.dayDate.getDate())] });
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
