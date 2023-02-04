import assert from 'assert';
import { readFileSync } from 'fs';
import { describe, it } from 'node:test';
import path from 'path';
import { execPromise } from '../../src/utils/execPromise.js';

const outputFolder = 'output';

describe('Run app e2e', async () => {
  it('run app on git repo - accessibility', async () => {
    const exceResopnse = await execPromise(
      `npm run start -- -o=./${outputFolder} -p=../accessibility -e=chenpeleg@gmail.com`
    );
    const resLines = exceResopnse.split('\n').slice(2);
    const outputLine = resLines.find((l) => l.includes(outputFolder));

    const hash = outputLine.split(outputFolder + '/')[1];
    const pathToFile = `./${outputFolder}/hours-report-${hash}.csv`;
    const resultCsv = readFileSync(path.resolve(pathToFile)).toString();
 
    assert.equal(resultCsv.length > 5000, true);
    assert.equal(resultCsv.includes('Total hours'), true);
    assert.equal(resultCsv.includes('Total hours,,11'), true);
  });
});
