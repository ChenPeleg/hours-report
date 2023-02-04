import assert from 'assert';
import { readFileSync } from 'fs';
import { describe, it } from 'node:test';
import path from 'path';
import { execPromise } from '../../src/utils/execPromise.js';

const outputFolder = 'output';

const cleanStringsToFindInAccessibility = [
  'Hours report drorsoft/accessibility',
  'Total hours 11',
  'December Day Date Hours Details',
  'Thu 22.12 6 Initial commit; graphics; just the docs theme;',
];

const removeCommasAndMultiSpaces = (text) =>
  text.replace(/,/g, ' ').replace(/  +/g, ' ');

describe('Run app e2e', async () => {
  it('run app on git repo - accessibility', async () => {
    const exceResopnse = await execPromise(
      `npm run start -- -o=./${outputFolder} -p=../accessibility -e=chenpeleg@gmail.com`,
    );
    const resLines = exceResopnse.split('\n').slice(2);
    const outputLine = resLines.find((l) => l.includes(outputFolder));

    const hash = outputLine.split(outputFolder + '/')[1];
    const pathToFile = `./${outputFolder}/hours-report-${hash}.csv`;
    const resultCsv = readFileSync(path.resolve(pathToFile)).toString();

    const cleanText = removeCommasAndMultiSpaces(resultCsv);
    assert.equal(resultCsv.length > 500, true);
    for (const text of cleanStringsToFindInAccessibility) {
      assert.equal(cleanText.includes(text), true);
    }

  });
});
