import test, { before, describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { WorkSessionsBuild } from '../src/core/workSessionsBuild.js';
import { workSessionBuildData } from '../src/core/workSessionBuildData.js';
import { gitEntryFixtures } from './fixtures/gitLogEntry.fixtures.js';
import { defaultConfig } from '../src/config/defaultConfig.js';

/** @typedef { import('../src/types/gitLogEntry.js').GitLogEntry  }GitLogEntry */

describe('Work session build', () => {
  // it('should work', () => {
  //   const fixture = /** @type {GitLogEntry[]} */ gitEntryFixtures.fixture1.map(
  //     (o) => {
  //       return { ...o, date: new Date(o.date) };
  //     }
  //   );
  //
  //   // @ts-ignore
  //   const result = WorkSessionsBuild(fixture, defaultConfig);
  //   // assert.equal(result, {});
  // });
});
