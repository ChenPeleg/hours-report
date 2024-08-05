import { describe, it } from "node:test";
import { gitLogsFixtures } from "../fixtures/gitLogs.fixtures.js";
import { parseGitLogToEntries } from "../../src/core/gitLogParseToEntries.js";
import assert from "node:assert/strict";
import { WorkSessionsBuild } from "../../src/core/workSessionsBuild.js";
import { buildReportFromSession } from "../../src/report/buildReport.js";
import { defaultConfig } from "../../src/config/defaultConfig.js";
import { buildCsvAsString } from "../../src/export/buildCsvAsString.js";

describe("Hours sum bug", () => {
  it("should sum the hours by the days summary", () => {
    const fixture = gitLogsFixtures.fixture1
      .split("\n")
      .slice(0, 61)
      .join("\n");
    const logEntries = parseGitLogToEntries(fixture);
    const workSessions = WorkSessionsBuild(logEntries, defaultConfig);
    const report = buildReportFromSession(workSessions, defaultConfig, "name");
    const csvAsString = buildCsvAsString(report);
    console.log(csvAsString);
    assert.equal(1, 1);
  });
});
