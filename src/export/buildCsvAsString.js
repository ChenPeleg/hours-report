const CELLS_PER_ROW = 15;

/**
 *
 * @param {string[]| any} cells
 * @return {string[]}
 */
const buildSafeRow = (...cells) => {
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

const roundHours = (minuets) => Math.ceil(minuets / 60);

/**
 * @param  {import("../types/Report.js").Report} report
 */
export const buildCsvAsString = (report) => {
  /** @type {Array<string[]>}  */
  let csvRows = [];
  const r = (...args) => csvRows.push();
  r('Hours report ', '-', report.repoName, '-', report.userEmail);

  r(' ***** ', ' ***** ', '*****', ' - ', '*****');
  report.months.forEach((month) => {
    r(
      month.MonthDate.toLocaleString('default', { month: 'long' }),
      '---',
      'Total hours',
      roundHours(month.minuetSum).toString()
    );
    month.days.forEach((day) => {
      r(
        '',
        day.dayDate.toLocaleDateString('default', { weekday: 'long' }),
        day.dayDate.getDate().toString(),
        '  ',
        roundHours(day.minuetSum).toString(),
        roundHours(month.minuetSum).toString()
      );
    });
    r('', '');
  });

  return csvRows.map((r) => {
    for (let c = r.length; c < CELLS_PER_ROW; c++) {
      r.push(' ,');
    }
    r.push('\n');
    return r;
  });
};
