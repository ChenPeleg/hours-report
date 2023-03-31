import { describe, it } from 'node:test'
import { workSessionFixtures } from '../fixtures/workSessionFixture.js'
import { defaultConfig } from '../../src/config/defaultConfig.js'
import assert from 'node:assert'
import { dayFixture } from '../fixtures/dayFixture.js'
import { buildReportMonths } from '../../src/report/buildReportMonths.js'
import { buildReportFromSession } from '../../src/report/buildReport.js'
import { DateAndTimeUtil } from '../../src/utils/dateAndTime.js'

describe('Build report', () => {
  it('Builds months from days correctly', () => {
    const fixture = dayFixture.fixture1
    /** @type import('../../src/types/Day.js').Day[] */
    const jsDays = fixture.map((s) => {
      /** @type import('../../src/types/Day.js').Day */
      const oneDay = {
        ...s,
        dayDate: new Date(s.dayDate),
        workSessions: [],
      }

      oneDay.workSessions = s.workSessions.map((ws) => ({
        ...ws,
        startTime: new Date(ws.startTime),
        finishTime: new Date(ws.finishTime),
        logEntries: ws.logEntries.map((le) => ({
          ...le,
          date: new Date(le.date),
          email: le.email,
        })),
      }))
      return oneDay
    })

    const months = buildReportMonths(jsDays, defaultConfig)
    assert.equal(
      months[0].MonthDate.toLocaleDateString('en-US'),
      jsDays[0].dayDate.toLocaleDateString('en-US')
    )
    const numberOfMonthsInDays = Array.from(
      new Set(jsDays.map((d) => d.dayDate.getMonth()))
    )
    assert.equal(months.length, numberOfMonthsInDays.length)
  })
  it('Builds Report from sessions correctly', () => {
    const fixture = workSessionFixtures.fixture1
    /** @type import('../../src/types/workSession.js').WorkSession[] */
    const sessions = fixture.map((s) => {
      /** @type import('../../src/types/workSession.js').WorkSession */
      const dateSession = {
        ...s,
        startTime: new Date(s.startTime),
        finishTime: new Date(s.finishTime),
        logEntries: [],
      }
      dateSession.logEntries = s.logEntries.map((le) => ({
        ...le,
        date: new Date(le.date),
        email: le.email,
      }))
      return dateSession
    })

    const report = buildReportFromSession(sessions, defaultConfig, 'repo-name')
    const minuetsFromSessions = sessions
      .map((s) =>
        DateAndTimeUtil.getMinutesBetweenDates(s.startTime, s.finishTime)
      )
      .reduce((a, b) => a + b)
    assert.equal(report.repoName, 'repo-name')
    assert.equal(report.months.length, 2)
    assert.equal(report.minuetSum, minuetsFromSessions)
  })
})
