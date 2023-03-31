import { logToConsole } from '../utils/logToConsole.js'
import { TestFrameWorkConsole } from '../utils/consoleFormat.js'

const STANDARD_CELL_SIZE = 9

const makeCellsEvanSize = (csv) => {
  const adjustCellsInRows = (row) => {
    const cells = row.split(',')
    const newCells = []
    let passToNextCell = ''
    for (let i = 0; i < cells.length; i++) {
      let cell = cells[i].trim()
      if (cell.length < STANDARD_CELL_SIZE) {
        cell += ' '.repeat(STANDARD_CELL_SIZE - cell.length)
      }
      newCells.push(cell)
    }
    const finalRow = newCells.join('')
    if (finalRow.includes('Details') || finalRow.includes('Hours report')) {
      return TestFrameWorkConsole.paint(finalRow, {
        color: 'green',
        background: 'BGwhite',
      })
    } else if (finalRow.includes('Total')) {
      const finalRowArr = finalRow.split('Total')
      finalRowArr[0] = finalRowArr[0].slice(0, 40)
      finalRowArr[1] = TestFrameWorkConsole.paint(' Total' + finalRowArr[1], {
        color: 'green',
        background: 'BGwhite',
      })
      return finalRowArr.join('')
    }
    //Details add color
    return finalRow
  }
  return csv
    .split('\n')
    .map((r) => adjustCellsInRows(r))
    .join('\n')
}

export const exportReportToConsole = (csv) => {
  const tableForConsole = makeCellsEvanSize(csv)
  logToConsole(tableForConsole)
}
