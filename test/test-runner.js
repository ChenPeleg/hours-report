import {run} from 'node:test';
import path from 'path';
import {getTestFiles} from './utils/getTestFiles.js';

const getTapDataAsync = (testFiles) => {
  let allData = '';
  return new Promise((resolve, reject) => {
    const stream = run({
      files: testFiles,
    });
    stream.on('data', (data) => (allData += data.toString()));
    stream.on('close', (data) => resolve(allData));
    stream.on('error', (err) => reject(err));
  });
};
const mainRunner = async () => {
  const testFiles = (await getTestFiles(path.resolve('./test')))
      .filter((f) => f.includes('test.js'))
      .map((p) => path.resolve('./test', p));
  const result = await getTapDataAsync(testFiles);
  console.log(result);
};
mainRunner().then((r) => r);
