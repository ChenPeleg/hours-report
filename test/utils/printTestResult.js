import { TestFrameWorkConsole } from '../../src/utils/consoleFormat.js';
import path from 'path';
/**
 * @typedef {{todo: string, duration_ms: string, fail: string, tests: string, pass: string, cancelled: string, skipped: string}} Conclusions
 */
/** @param {Conclusions} conclusions */
const writeFinalResults = (conclusions) => {
  const { skipped, fail, pass } = conclusions;
  if (+skipped) {
    console.log(
      TestFrameWorkConsole.paint(
        `${skipped} Tests ${TestFrameWorkConsole.paint(' SKIPPED ', {
          color: 'white',
          background: 'BGyellow',
        })}`
      )
    );
  }
  if (+fail) {
    console.log(
      TestFrameWorkConsole.paint(
        `${fail} Tests ${TestFrameWorkConsole.paint(' FAILED ', {
          color: 'white',
          background: 'BGred',
        })}`
      )
    );
  }
  console.log(
    TestFrameWorkConsole.paint(
      `${pass} Tests ${TestFrameWorkConsole.paint(' PASSED ', {
        color: 'white',
        background: 'BGgreen',
      })}`,
      { background: 'BGblack' }
    )
  );
};

const getConclusions = (resultsAsText) => {
  const resultArr = resultsAsText.split('\n');
  const resultRows = resultArr.slice(-9);

  const conclusions = {
    tests: '',
    pass: '',
    fail: '',
    cancelled: '',
    skipped: '',
    todo: '',
    duration_ms: '',
  };
  Object.keys(conclusions).forEach((key) => {
    const corispondingData = resultRows.find((r) => r.includes(`# ${key}`));
    if (corispondingData) {
      conclusions[key] = corispondingData.replace(`# ${key}`, '').trim();
    }
  });

  return { conclusionsText: resultRows.join('\n'), conclusions };
};

const reformatMainData = (text, passed) => {
  text = text.replace(/# tests[\s\S]*# todo/g, '');
  const lines = text.split('\n');
  const argumentsForLineRemoval = [
    passed ? '# Subtest' : 'TAP version',
    ' stdout: |-',
    'exitCode: 1',
    `failureType: 'subtestsFailed'`,
    '...',
    '1..1',
    '---',
    'duration_ms',
    'TAP version',
  ];
  const removedRedundant = lines.filter(
    (l) => !argumentsForLineRemoval.some((a) => l.includes(a))
  );
  const currentPath = path.resolve('').replace(/\\/g, '\\\\');

  const formatUrl = removedRedundant.map((l) => {
    l = l.replace(currentPath, '');
    l = l.replace(/\\/g, ' ');
    l = l.replace('not ok ', TestFrameWorkConsole.paint('failed X ', 'red'));
    l = l.replace('ok ', TestFrameWorkConsole.paint('passed ✔ ', 'green'));
    return l;
  });
  let finalArr = formatUrl;

  if (!passed) {
    let paintErrorLines = 0;
    finalArr = finalArr
      .map((l, i) => {
        if (formatUrl[i + 1]?.includes('passed')) {
          return '';
        }
        if (l.includes('ERR_TEST_FAILURE')) {
          return '\n';
        }
        l = l.replace('# Subtest', 'Description');
        if (l.includes('Expected')) {
          paintErrorLines = 8;
          l = TestFrameWorkConsole.paint(`${l}`, 'yellow');
        }
        if (paintErrorLines > 0) {
          --paintErrorLines;
          l = TestFrameWorkConsole.paint(`${l}`, 'yellow');
        }
        if (l.includes(' stack: |-')) {
          paintErrorLines = 0;
        }
        return l;
      })
      .filter((l) => l);
  }
  return finalArr.join('\n');
};

/**
 * @param {string} resultsAsText
 * @return string
 */
export const printTestResult = (resultsAsText, passed = true) => {
  try {
    const conclusionsObj = getConclusions(resultsAsText);
    const textWithoutConclutions = resultsAsText.replace(
      conclusionsObj.conclusionsText,
      ''
    );
    const mainData = reformatMainData(textWithoutConclutions, passed);
    console.log(mainData);
    writeFinalResults(conclusionsObj.conclusions);
  } catch (err) {
    console.log(resultsAsText);
  }
};