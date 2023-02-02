const CELLS_PER_ROW = 15;

/**
 * @param {string[]| any} cells
 * @return {string[]}
 */
const buildSafeRow = (...cells) => {
  const makeDataSafe = (unsafeData) => {
    const rgx = /[,\n"\\\r]/g;
    if (rgx.test(unsafeData)) {
      let safe = unsafeData.replace(/"/g, "'");
      safe = safe.replace(/,/g, ' ');
      return `"${safe}"`;
    }
    return unsafeData;
  };

  return cells.map((cell) => makeDataSafe(cell));
};

const roundHours = (minuets) => Math.ceil(minuets / 60);

/**
 * @param  {import("../types/Report.js").Report} report
 */
export const buildCsvAsString = (report) => {
  /** @type {Array<string[]>}  */
  let csvRows = [];
  const r = (...args) => csvRows.push(buildSafeRow(...args));
  const repoName = [report.repoName, ""]
  try {
    repoName[1] = report.repoName.split("/")[1]
    repoName[0] = report.repoName.split("/")[0]
  } catch (err) {

  }

  r('Hours report ', '', repoName[1], repoName[0], report.userEmail);
  r(report.userEmail, '', new Date().toString());


  r('   ', '  ', '   ', '   ', ' ');
  report.months.forEach((month) => {
    const monthName = month.MonthDate.toLocaleString('en-GB', {
      month: 'long',
    });
    r(
        monthName,
        '-------',
        '-------',
        'Hours',
        '-------',
        '----|--',
        `Total:`,
        roundHours(month.minuetSum).toString()
    );
    month.days.forEach((day) => {
      r(
          `    ${day.dayDate.toLocaleDateString('en-GB', {weekday: 'short'})}`,
          `${day.dayDate.getDate().toString()}.${month.MonthDate.getMonth() + 1}`,
          '  ',
          roundHours(day.minuetSum).toString()
      );
    });
    r('', '');
  });

  const textRows = csvRows.map((row) => {
    for (let c = row.length; c < CELLS_PER_ROW; c++) {
      console.log(row);
    }
    return row.join();
  });
  return textRows.join('\n');
};
