import { describe, it } from 'node:test';
import { workSessionFixtures } from './fixtures/workSessionFixture.js';
import { buildDaysFromSessions } from '../src/report/buildReportDays.js';
import { defaultConfig } from '../src/config/defaultConfig.js';
import assert from 'node:assert';
import { dayFixture } from './fixtures/dayFixture.js';
import { buildReportMonths } from '../src/report/buildReportMonths.js';

describe('Build report', () => {
  it('Builds months from days correctly', () => {
    const fixture = dayFixture.fixture1;
    /**
     * @type import('../src/types/Day.js').Day[]
     */
    const jsDays = fixture.map((s) => {
      /**
       * @type import('../src/types/Day.js').Day
       */
      const oneDay = {
        ...s,
        dayDate: new Date(s.dayDate),
        workSessions: [],
      };

      oneDay.workSessions = s.workSessions.map((ws) => ({
        ...ws,
        startTime: new Date(ws.startTime),
        finishTime: new Date(ws.finishTime),
        logEntries: ws.logEntries.map((le) => ({
          ...le,
          date: new Date(le.date),
          email: le.email,
        })),
      }));
      return oneDay;
    });

    const months = buildReportMonths(jsDays, defaultConfig);
    assert.equal(
      months[0].MonthDate.toLocaleDateString('en-US'),
      jsDays[0].dayDate.toLocaleDateString('en-US')
    );
    const numberOfMonthsInDays = Array.from(
      new Set(jsDays.map((d) => d.dayDate.getMonth()))
    );
    assert.equal(months.length, numberOfMonthsInDays.length);
  });
});
