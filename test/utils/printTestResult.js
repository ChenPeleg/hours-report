import {TestFrameWorkConsole} from '../../src/utils/consoleFormat.js';
import path from 'path';
/**
 * @typedef {{todo: string, duration_ms: string, fail: string, tests: string, pass: string, cancelled: string, skipped: string}} Conclusions
 */
/** @param {Conclusions} conclusions */
const writeFinalResults = (conclusions) => {
  const {skipped, fail, pass} = conclusions;
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
          {background: 'BGblack'}
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

  return {conclusionsText: resultRows.join('\n'), conclusions};
};

const reformatMainData = (text) => {
  const lines = text.split('\n');
  const argumentsForLineRemoval = ['# Subtest', '...', '---', 'duration_ms'];
  const removedRedundant = lines.filter(
      (l) => !argumentsForLineRemoval.some((a) => l.includes(a))
  );
  const currentPath = path.resolve('').replace(/\\/g, '\\\\');

  const formatUrl = removedRedundant.map((l) => {
    l = l.replace(currentPath, '');
    l = l.replace(/\\/g, ' ');
    l = l.replace('ok', TestFrameWorkConsole.paint('passed ✔ ', 'green'));
    return l;
  });
  return formatUrl.join('\n');
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
    const mainData = reformatMainData(textWithoutConclutions);

    console.log(mainData);
    writeFinalResults(conclusionsObj.conclusions);
  } catch (err) {
    console.log(resultsAsText)
  }


};
