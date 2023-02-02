import test, { before, describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { WorkSessionsBuild } from '../src/core/workSessionsBuild.js';
import { workSessionBuildData } from '../src/core/workSessionBuildData.js';
import { gitEntryFixtures } from './fixtures/gitLogEntry.fixtures.js';
import { defaultConfig } from '../src/config/defaultConfig.js';
import { DateAndTimeUtil } from '../src/utils/dateAndTime.js';

/** @typedef { import('../src/types/gitLogEntry.js').GitLogEntry  }GitLogEntry */

describe('Work session build', () => {
  it('groups git log entries correctly', () => {
    const fixture = /** @type {GitLogEntry[]} */ gitEntryFixtures.fixture1.map(
      (o) => {
        return { ...o, date: new Date(o.date) };
      }
    );
    // @ts-ignore
    const result = WorkSessionsBuild(fixture, defaultConfig);
    assert.equal(result.length, 6);
  });
  describe('time calculations', () => {
    it('start time of first session is the first commit minus config.MinuetsToAddToFirstCommit', () => {
      const fixture =
        /** @type {GitLogEntry[]} */ gitEntryFixtures.fixture1.map((o) => {
          return { ...o, date: new Date(o.date) };
        });
      const firstGitCommit = fixture.slice(-1)[0];
      // @ts-ignore
      const result = WorkSessionsBuild(fixture, defaultConfig);
      const firstWorkSession = result[0];
      const minutesBetweenDates = DateAndTimeUtil.getMinutesBetweenDates(
        firstWorkSession.startTime,
        firstGitCommit.date
      );
      assert.equal(
        minutesBetweenDates,
        defaultConfig.MinuetsToAddToFirstCommit
      );
    });
    it('end time is the time of last commit (if more than one)', () => {
      const fixture =
        /** @type {GitLogEntry[]} */ gitEntryFixtures.fixture1.map((o) => {
          return { ...o, date: new Date(o.date) };
        });
      const firstGitCommits = fixture.slice(-5)[0];
      // @ts-ignore
      const result = WorkSessionsBuild(fixture, defaultConfig);
      const firstWorkSession = result[0];

      assert.equal(result.length, 1);
    });
  });
});
