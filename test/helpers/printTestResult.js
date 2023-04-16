import { TestFrameWorkConsole } from "../../src/utils/consoleFormat.js";
import path from "path";
import { logToConsole } from "../../src/utils/logToConsole.js";
import { logger } from "../../src/utils/logger.js";
/**
 * @typedef {{
 *   todo: string;
 *   duration_ms: string;
 *   fail: string;
 *   tests: string;
 *   pass: string;
 *   cancelled: string;
 *   skipped: string;
 * }} Conclusions
 */
/** @param {Conclusions} conclusions */
const writeFinalResults = (conclusions) => {
  const { skipped, fail, pass } = conclusions;
  if (+skipped) {
    logToConsole(
      TestFrameWorkConsole.paint(
        `${skipped} Tests ${TestFrameWorkConsole.paint(" SKIPPED ", {
          color: "white",
          background: "BGyellow",
        })}`
      )
    );
  }
  if (+fail) {
    logToConsole(
      TestFrameWorkConsole.paint(
        `${fail} Tests ${TestFrameWorkConsole.paint(" FAILED ", {
          color: "white",
          background: "BGred",
        })}`
      )
    );
  }
  logToConsole(
    TestFrameWorkConsole.paint(
      `${pass} Tests ${TestFrameWorkConsole.paint(" PASSED ", {
        color: "white",
        background: "BGgreen",
      })}`,
      { background: "BGblack" }
    )
  );
};

const getConclusions = (resultsAsText) => {
  const resultArr = resultsAsText.split("\n");
  const resultRows = resultArr.slice(-9);

  const conclusions = {
    tests: "",
    pass: "",
    fail: "",
    cancelled: "",
    skipped: "",
    todo: "",
    duration_ms: "",
  };
  Object.keys(conclusions).forEach((key) => {
    const correspondingData = resultRows.find((r) => r.includes(`# ${key}`));
    if (correspondingData) {
      conclusions[key] = correspondingData.replace(`# ${key}`, "").trim();
    }
  });

  return { conclusionsText: resultRows.join("\n"), conclusions };
};

const reformatMainData = (text, passed) => {
  text = text.replace(/# tests[\s\S]*# todo/g, "");
  const lines = text.split("\n");
  const argumentsForLineRemoval = [
    passed ? "# Subtest" : "TAP version",
    " stdout: |-",
    "exitCode: 1",
    `failureType: 'subtestsFailed'`,
    "...",
    "1..1",
    "---",
    "duration_ms",
    "TAP version",
  ];
  const removedRedundant = lines.filter(
    (l) => !argumentsForLineRemoval.some((a) => l.includes(a))
  );
  const currentPath = path.resolve("").replace(/\\/g, "\\\\");

  const formatUrl = removedRedundant.map((l) => {
    l = l.replace(currentPath, "");
    l = l.replace(/\\/g, " ");
    l = l.replace("not ok ", TestFrameWorkConsole.paint("failed X ", "red"));
    l = l.replace("ok ", TestFrameWorkConsole.paint("passed ✔ ", "green"));
    return l;
  });
  let finalArr = formatUrl;

  if (!passed) {
    let paintErrorLines = 0;
    finalArr = finalArr
      .map((l, i) => {
        if (formatUrl[i + 1] && formatUrl[i + 1].includes("passed")) {
          return "";
        }
        if (l.includes("ERR_TEST_FAILURE")) {
          return "\n";
        }
        l = l.replace("# Subtest", "Description");
        if (l.includes("Expected")) {
          paintErrorLines = 8;
          l = TestFrameWorkConsole.paint(`${l}`, "yellow");
        }
        if (paintErrorLines > 0) {
          --paintErrorLines;
          l = TestFrameWorkConsole.paint(`${l}`, "yellow");
        }
        if (l.includes(" stack: |-")) {
          paintErrorLines = 0;
        }
        return l;
      })
      .filter((l) => l);
  }
  return finalArr.join("\n");
};

/**
 * @param {string} resultsAsText
 * @param {boolean} passed
 * @param {any[]} resultsAsTestObjects
 * @returns String
 */
export const printTestResult = (
  resultsAsText,
  passed,
  resultsAsTestObjects
) => {
  try {
    let conclusionsObj = getConclusions(resultsAsText);

    if (resultsAsText.includes("[object Object][object Object]") && passed) {
      const tests = resultsAsTestObjects.map((t) => ({
        file: t.file || t.name,
        testNumber: t.testNumber,
      }));

      const testsSet = Array.from(new Set(tests.map((t) => t.file)))
        // @ts-ignore
        .map((f) => tests.findLast((t) => t.file === f))
        .map((t) => `ok ${t.testNumber} - ${t.file}`);

      resultsAsText = testsSet.join("\n") + "\n";
      conclusionsObj.conclusions.pass = testsSet.length.toString();
    }
    const textWithoutConclusions = resultsAsText.replace(
      conclusionsObj.conclusionsText,
      ""
    );

    const mainData = reformatMainData(textWithoutConclusions, passed);
    logToConsole(mainData);
    writeFinalResults(conclusionsObj.conclusions);
  } catch (err) {
    console.log("error", err);
    logToConsole(resultsAsText);
  }
};
