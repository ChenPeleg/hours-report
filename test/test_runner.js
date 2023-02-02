import { run } from 'node:test';
import path from 'path';
import { getTestFiles } from './test-utils/getTestFiles.js';
import { printTestResult } from './test-utils/printTestResult.js';

const storedConsoleLogs = [];
const originalConsoleLog = console.log;

/**
 * @param testFiles
 * @return {Promise<{data: string, pass: boolean}>}
 */
const getTapDataAsync = (testFiles) => {
  // @ts-ignore
  console = {
    ...console,
    log: (...args) => {
      storedConsoleLogs.push(args);
      originalConsoleLog(args);
    },
  };
  let allData = '';
  let pass = true;
  return new Promise((resolve, reject) => {
    const stream = run({
      files: testFiles,
    });
    stream.on('data', (data) => (allData += data.toString()));
    stream.on('test:fail', (data) => (pass = false));
    stream.on('close', (data) => resolve({ data: allData, pass }));
    stream.on('error', (err) => reject(err));
  });
};
const mainRunner = async () => {
  try {
    console.log = originalConsoleLog;
    const testFiles = (await getTestFiles(path.resolve('./test')))
      .filter((f) => f.includes('test.js'))
      .map((p) => path.resolve('./test', p));
    const result = await getTapDataAsync(testFiles);
    if (result) {
      printTestResult(result.data, result.pass);
      if (result.pass) {
        return true;
      }
    }
  } catch (err) {
    console.error('error', err);
  }

  process.exit(1);
};
mainRunner().then();
