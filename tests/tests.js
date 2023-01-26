import {describe, it} from 'node:test';
import assert from 'node:assert/strict';

describe('First Tests', () => {
  it('ping', (_t) => {
    const ping = () => 'pong';
    assert.equal(ping(), 'pong');
  });
});
