import { describe, it } from "node:test";
import { workSessionFixtures } from "../fixtures/workSessionFixture.js";
import { buildDaysFromSessions } from "../../src/report/buildReportDays.js";
import { defaultConfig } from "../../src/config/defaultConfig.js";
import assert from "node:assert";

describe("Build report", () => {
  it("Builds days from work session correctly", () => {
    const fixture = workSessionFixtures.fixture1;
    /** @type import('../../src/types/workSession.js').WorkSession[] */
    const sessions = fixture.map((s) => {
      /** @type import('../../src/types/workSession.js').WorkSession */
      const dateSession = {
        ...s,
        startTime: new Date(s.startTime),
        finishTime: new Date(s.finishTime),
        logEntries: [],
      };
      dateSession.logEntries = s.logEntries.map((le) => ({
        ...le,
        date: new Date(le.date),
        email: le.email,
      }));
      return dateSession;
    });
    const days = buildDaysFromSessions(sessions, defaultConfig);
    assert.equal(
      days[0].dayDate.toLocaleDateString("en-US"),
      sessions[0].startTime.toLocaleDateString("en-US")
    );
    assert.equal(days.length, sessions.length);
  });
});
