import test, { before, describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { WorkSessionsBuild } from '../src/core/workSessionsBuild.js';

describe('Work session build', () => {
  before(() => console.log('about to run some test'));
  console.log('asdfasdfasdf');
  it('should work', () => {
    console.log('asdfasdfasdf');
    assert.equal(1, 1);
  });
});
