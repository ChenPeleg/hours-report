import { buildCsvAsString } from './buildCsvAsString.js';
import { saveToCsvFile } from './saveToCsvFile.js';
import { logToConsole } from '../utils/logToConsole.js';

const STANDARD_CELL_SIZE = 9;

const makeCellsEvanSize = (csv) => {
  const adjustCellsInRows = (row) => {
    const cells = row.split(',');
    const newCells = [];
    let passToNextCell = '';
    for (let i = 0; i < cells.length; i++) {
      let cell = cells[i].replace(/\s/g, '');
      if (cell.length < STANDARD_CELL_SIZE) {
        cell += ' '.repeat(STANDARD_CELL_SIZE - cell.length);
      }
      newCells.push(cell);
    }
    //Details add color
    return newCells.join('');
  };
  return csv
    .split('\n')
    .map((r) => adjustCellsInRows(r))
    .join('\n');
};

export const exportReportToConsole = (report) => {
  const csv = buildCsvAsString(report);
  const tableForConsole = makeCellsEvanSize(csv);
  logToConsole(tableForConsole);
};
