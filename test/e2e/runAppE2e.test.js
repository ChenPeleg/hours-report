import { readFileSync } from 'fs';

import path from 'path';
import { execPromise } from '../../src/utils/execPromise.js';
import { logToConsole } from '../../src/utils/logToConsole.js';

const outputFolder = 'output';

const cleanStringsToFindInAccessability = [
  'Hours report drorsoft/accessibility',
  'Total hours 11',
  'December Day Date Hours Details',
  'Thu 22.12 6 Initial commit; graphics; just the docs theme;',
];

const removeCommasAndMultiSpaces = (text) =>
  text.replace(/,/g, ' ').replace(/  +/g, ' ');

const eq = (val1, val2) => {
  if (val1 !== val2) {
    throw `Assertion Error ${val1} !== ${val2}`;
  }
};

const e2eTest = async () => {
  const exceResopnse = await execPromise(
    `npm run start -- -o=./${outputFolder} -p=../accessibility -e=chenpeleg@gmail.com`
  );
  const resLines = exceResopnse.split('\n').slice(2);
  const outputLine = resLines.find((l) => l.includes(outputFolder));

  const hash = outputLine.split(outputFolder + '/')[1];
  const pathToFile = `./${outputFolder}/hours-report-${hash}.csv`;
  const resultCsv = readFileSync(path.resolve(pathToFile)).toString();

  const cleanText = removeCommasAndMultiSpaces(resultCsv);

  eq(cleanText.length > 100, true);
  for (const text of cleanStringsToFindInAccessability) {
    eq(cleanText.includes(text), true);
  }
  logToConsole('e2e passed');
};

e2eTest().then();
