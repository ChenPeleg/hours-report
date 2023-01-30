import { run } from 'node:test';
import path from 'path';

const getStream = async () => {
  const stream = run({ files: [path.resolve('./test/first.test.js')] }).pipe(
    process.stdout
  );

  stream.on('end', (res) => Promise.resolve(res));
};

const testRunner = async () => {
  const result = getStream();
  console.log('************');
  console.log(result);
  console.log('************');
};
