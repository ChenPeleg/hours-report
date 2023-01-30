import { run } from 'node:test';
import path from 'path';
import { getTestFiles } from './utils/getTestFiles.js';

const anotherTry = async () => {
  const allfiles = (await getTestFiles(path.resolve('./test'))).filter((f) =>
    f.includes('test.js')
  );
  const stream = run({
    concurrency: false,
    files: allfiles,
  });
  stream.on('test:diagnostic', (data) => console.dir(data));
  stream.on('test:fail', (data) => console.dir(data));
  stream.on('test:pass', (data) => console.dir(data));
};
anotherTry().then();
