import { run } from 'node:test';
import path from 'path';

const getStream = () => {
  return new Promise((resolve, reject) => {
    const tapStream = run({
      files: [path.resolve('./test/first.test.js')],
    }).pipe(process.stdout);
    tapStream.on('end', (res) => {
      console.log('################');
      resolve(tapStream);
      console.log('################');
    });
  });
};

const testRunner = async () => {
  console.log('************');
  const result = await getStream();
  console.log(result);
  console.log('************');
};

// testRunner().then();
const streamToPromise = (stream) => {
  return new Promise((res, rej) => {
    stream.on('end', () => {
      console.log('################');
      res(stream);
      console.log('################');
    });
  });
};
const anotherTry = async () => {
  const stream = run({ files: [path.resolve('./test/first.test.js')] });
  console.log('1');
  const result = await streamToPromise(stream);
  console.log('2');
  console.log(result);
};
anotherTry().then();
