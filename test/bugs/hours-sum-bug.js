import { describe, it } from "node:test";
import { gitLogsFixtures } from "../fixtures/gitLogs.fixtures.js";
import { parseGitLogToEntries } from "../../src/core/gitLogParseToEntries.js";
import assert from "node:assert/strict";

describe("Hours sum bug", () => {
  it("should sum the hours by the days summary", () => {
    const fixture = gitLogsFixtures.fixture1
      .split("\n")
      .slice(0, 31)
      .join("\n");
    const result = parseGitLogToEntries(fixture);
    assert.equal(result.length, 30);
    assert.equal(result[0].email, "cp@gmail.com");
    assert.equal(
      result[0].date.toString(),
      new Date("2023-01-30T19:54:05.000Z").toString()
    );
  });
});
