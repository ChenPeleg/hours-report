import { run } from 'node:test';
import path from 'path';

const getStream = () => {
  return new Promise((resolve, reject) => {
    const tapStream = run({ files: [path.resolve('./test/first.test.js')] });
    //     .pipe(
    //   process.stdout
    // );
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

testRunner().then();
