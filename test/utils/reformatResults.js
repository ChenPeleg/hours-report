import { TestFrameWorkConsole } from '../../src/utils/consoleFormat.js';
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

const reformatMainData = (text) => {
  text;
};

/**
 * @param {string} resultsAsText
 * @return string
 */
export const reformatResults = (resultsAsText, passed = true) => {
  const conclusionsObj = getConclusions(resultsAsText);
  const textWithoutConclutions = resultsAsText.replace(
    conclusionsObj.conclusionsText,
    ''
  );

  console.log(textWithoutConclutions);
  writeFinalResults(conclusionsObj.conclusions);

  return resultsAsText;
};
