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
 * @param {import("../types/Month.js").Month} month
 * @returns {import("../xlsx/types/worksheet.types.js").Sheet}
 */
function creatASheetForMonth(month) {
  /** @type {import("../xlsx/types/worksheet.types.js").Row[]} */
  const rows = [];
  /** @type {import("../xlsx/types/worksheet.types.js").Sheet} */
  const sheet = { name: month.MonthDate.getMonth().toString(), rows: rows };

  month.days.forEach((d) => {
    d.workSessions.forEach((s) => {
      if (d) {
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
    cells.forEach((c, ci) => {
      oneRow.cells.push({
        value: c,
        dataType: isNaN(+c) ? "string" : "number",
        style: {},
      });
    });
    firstSheet.rows.push(oneRow);
  });
  return { rows: firstSheet.rows, name: "main_report" };
}
