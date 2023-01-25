
import test from 'node:test';
import assert from 'node:assert';

test('synchronous passing test', (t) => {
    // This test passes because it does not throw an exception.
    assert.strictEqual(1, 1);
});
