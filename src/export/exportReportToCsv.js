const CELLS_PER_ROW = 30;

const buildRow = (...cells) => {
  const makeDataSafe = (unsafeData) => {
    const rgx = /[\n"\\\r]/g;
    if (rgx.test(unsafeData)) {
      const safe = unsafeData.replace(/"/g, "'");
      return `"${safe}"`;
    }
    return unsafeData;
  };
  return cells.map((cell) => makeDataSafe(cell)).join(',');
};

/**
 * @param  {import("../types/Report.js").Report} report
 */
export const exportReportToCsv = (report) => {
  let csvRows = [];
};
