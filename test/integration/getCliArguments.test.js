import { describe, it } from "node:test";
import { getConfigurationsFromArgs } from "../../src/config/getConfigurationsFromArgs.js";
import { ArgsOptionDictionary } from "../../src/config/argsOptionDictionary.js";
import assert from "node:assert";
import { getConfiguration } from "../../src/config/getConfigurations.js";

describe("Get Arguments from list", () => {
  it("ping 2", () => {
    const ping = () => "pong";
    assert.equal(ping(), "pong");
  });

  it("arguments returns a proper object ", () => {
    const argumantResult = getConfigurationsFromArgs(
      " --email=my-email@gmail.com -mx=200 -mn=100",
      ArgsOptionDictionary
    );

    assert.equal(argumantResult.Email, "my-email@gmail.com");
    assert.equal(argumantResult.MaxDiffForSession, 200);
    assert.equal(argumantResult.MinuetsToAddToFirstCommit, 100);
  });
  it("arguments throws an error if argument is missing", () => {
    const run = () =>
      getConfigurationsFromArgs(
        " --emainosucharg=my-email@gmail.com -mx=200 -mn=100",
        ArgsOptionDictionary
      );
    assert.throws(run);
  });
  it("arguments throws an error if argument is without value", () => {
    const run = () =>
      getConfigurationsFromArgs(" --email= ", ArgsOptionDictionary);
    assert.throws(run);
  });
  it("arguments throws an error if argument shorter that it should be", () => {
    const run = () =>
      getConfigurationsFromArgs(" --ema=abc123 ", ArgsOptionDictionary);
    assert.throws(run);
  });
  it("returns help=true if error ", () => {
    const res = getConfiguration([, , " -hfsdfsfdds "]);
    assert.equal(res.printHelp, true);
  });
  it("returns help=true if help flag passed ", () => {
    const res = getConfiguration([, , " -h "]);
    assert.equal(res.printHelp, true);
  });
});
