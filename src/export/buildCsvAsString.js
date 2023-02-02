const CELLS_PER_ROW = 30;

/**
 *
 * @param {string[]} cells
 * @return {string[]}
 */
const row = (...cells) => {
  const makeDataSafe = (unsafeData) => {
    const rgx = /[\n"\\\r]/g;
    if (rgx.test(unsafeData)) {
      const safe = unsafeData.replace(/"/g, "'");
      return `"${safe}"`;
    }
    return unsafeData;
  };

  return cells.map((cell) => makeDataSafe(cell) + ',');
};

/**
 * @param  {import("../types/Report.js").Report} report
 */
export const buildCsvAsString = (report) => {
  /**
   *
   * @type {Array<string[]>}
   */
  let csvRows = [];
  csvRows.push(
    row('Hours report ', '-', report.repoName, '-', report.userEmail)
  );
  csvRows.push(row(' ***** ', ' ***** ', '*****', ' - ', '*****'));
  return csvRows.map((r) => {
    for (let c = r.length; c < CELLS_PER_ROW; c++) {
      r.push(' ,');
    }
    r.push('lineEnd');
    return r;
  });
};
