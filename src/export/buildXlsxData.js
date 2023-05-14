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
        value: 10 || "asdf ",
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

function mockRows() {
  return [
    {
      cells: [
        {
          value: 10,
          style: {},
        },
        {
          value: "",
          style: {},
        },
        {
          value: "Text",
          style: {},
        },
        {
          value: 40,
          style: {
            background: "#FF0000",
          },
        },
        {
          value: "Text With style",
          style: {
            font: {
              color: "#FF0000",
            },
          },
        },
      ],
    },
  ];
}
