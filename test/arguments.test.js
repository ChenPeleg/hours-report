import { describe, it } from 'node:test';
import { getConfigFromArgs } from '../src/config/getConfigFromArgs.js';
import { ArgsOption } from '../src/config/argsOption.js';
import assert from 'node:assert/strict';

describe('Arguments ', () => {
  it('ping 2', () => {
    const ping = () => 'pong';
    assert.equal(ping(), 'pong');
  });

  it('argumantResult', () => {
    const argumantResult = getConfigFromArgs(
      ' --email=my-email@gmail.com -mx=200 -mn=100'.split(' '),
      ArgsOption
    );
    assert.equal(argumantResult.Email, 'my-email@gmail.com');
    assert.equal(argumantResult.MaxDiffForSession, 200);
    assert.equal(argumantResult.MinimumSessionMinuets, 100);
  });
});
