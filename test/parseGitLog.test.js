import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { gitLogsFixtures } from './fixtures/gitLogs.fixtures.js';
import { parseGitLogToEntries } from '../src/core/parseGitLogToEntries.js';

describe('Parse git log', () => {
  it('should parse git logs correctly', () => {
    const fixture = gitLogsFixtures.fixture1;
    const result = parseGitLogToEntries(fixture);
    assert.equal(result.length, 5);
  });
});
