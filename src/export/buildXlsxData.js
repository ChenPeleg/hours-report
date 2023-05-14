/**
 * @param {string} csvText
 * @returns {import("../xlsx/types/worksheet.types.js").Workbook}
 */
export const buildXlsxData = (csvText) => {
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

  return {
    name: "sheetReport",
    sheets: [{ rows: firstSheet.rows, name: "sheet_1" }],
  };
};
