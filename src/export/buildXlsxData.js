/**
 * @param {string} csvText
 * @param {import("../types/Report.js").Report} report
 * @returns {import("../xlsx/types/worksheet.types.js").Workbook}
 */
export const buildXlsxData = (csvText, report) => {
  return {
    name: "sheetReport",
    sheets: [getMainSheetFromCsv(csvText)],
  };
};

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
