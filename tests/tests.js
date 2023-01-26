import test from 'node:test';
import assert from 'node:assert/strict';
import { getConfigFromArgs } from '../src/config/getConfigFromArgs.js';
import { ArgsOption } from '../src/config/argsOption.js';

const ping = () => 'pong';

test('ping', (_t) => {
  const argumantResult = getConfigFromArgs(
    '-email my-email@gmail.com',
    ArgsOption
  );
  assert.equal(ping(), 'pong');
});
test('argumantResult', (_t) => {
  console.log('******', 'argumantResult');
  const argumantResult = getConfigFromArgs(
    ' --email=my-email@gmail.com mx=200 mn=100'.split(' '),
    ArgsOption
  );
  console.log('******', argumantResult);
  assert.equal(argumantResult, 'pong');
});
