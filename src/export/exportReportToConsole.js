import {buildCsvAsString} from './buildCsvAsString.js';
import {saveToCsvFile} from './saveToCsvFile.js';
import {logToConsole} from '../utils/logToConsole.js';

const STANDARD_CELL_SIZE = 10

const makeCellsEvanSize = (csv) => {
  const adjustCellsInRows = (row) => {
    const cells = row.split(',')
    const newCells = []
    let passToNextCell = "";
    for (let i = 0; i < cells.length; i++) {
      let cell = cells[i]
      if (cell.length > STANDARD_CELL_SIZE) {

      }
    }

  }
  const rows = csv.split('\n')

}

export const exportReportToConsole = (report) => {
  const csv = buildCsvAsString(report);
  logToConsole(csv);
};
