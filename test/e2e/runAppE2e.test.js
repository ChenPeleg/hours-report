import { describe, it } from 'node:test';
import { execPromise } from '../../src/utils/execPromise.js';

describe('Run app e2e', async () => {
  it('run app on git repo', async () => {
    const res = await execPromise('npm run start -- -o="./output -p=../Sidur"');
  });
});
