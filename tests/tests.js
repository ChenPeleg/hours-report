import test from "node:test";
import assert from "node:assert/strict";
const ping = () => "pong";

test("ping", (_t) => {
  assert.equal(ping(), "pong");
});
