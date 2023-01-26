import { describe, it } from 'node:test';
import { getConfigFromArgs } from '../src/config/getConfigFromArgs.js';
import { ArgsOption } from '../src/config/argsOption.js';
import assert from 'node:assert/strict';

describe('Get Arguments from list', () => {
  it('ping 2', () => {
    const ping = () => 'pong';
    assert.equal(ping(), 'pong');
  });

  it('arguments returns a proper object ', () => {
    const argumantResult = getConfigFromArgs(
      ' --email=my-email@gmail.com -mx=200 -mn=100',
      ArgsOption
    );
    assert.equal(argumantResult.Email, 'my-email@gmail.com');
    assert.equal(argumantResult.MaxDiffForSession, 200);
    assert.equal(argumantResult.MinimumSessionMinuets, 100);
  });
  it('arguments throws an error if argument is missing', () => {
    const run = () =>
      getConfigFromArgs(
        ' --emainosucharg=my-email@gmail.com -mx=200 -mn=100',
        ArgsOption
      );
    assert.throws(run);
  });
});
