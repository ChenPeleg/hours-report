import { TestFrameWorkConsole } from '../../src/utils/consoleFormat.js';

const writeFinalResults = ({ skipped, failed, passed }) => {
  if (skipped) {
    console.log(
      '\n',
      TestFrameWorkConsole.paint(
        `${skipped} Tests ${TestFrameWorkConsole.paint(' SKIPPED ', {
          color: 'white',
          background: 'BGyellow',
        })}`
      )
    );
  }
  if (failed) {
    console.log(
      TestFrameWorkConsole.paint(
        `${failed} Tests ${TestFrameWorkConsole.paint(' FAILED ', {
          color: 'white',
          background: 'BGred',
        })}`
      )
    );
  }
  console.log(
    '\n',
    TestFrameWorkConsole.paint(
      `${passed} Tests ${TestFrameWorkConsole.paint(' PASSED ', {
        color: 'white',
        background: 'BGgreen',
      })}`,
      { background: 'BGblack' }
    )
  );
  if (failed) {
    //  process.exit(1);
    throw new Error('npm ERR! Test failed.  See above for more details.');
  }
};

const getConclutions = (resultsAsText) => {
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

  console.log(resultRows);
  return { conclusionsText: resultRows.join(' '), conclusions };
};

/**
 * @param {string} resultsAsText
 * @return string
 */
export const reformatResults = (resultsAsText, passed = true) => {
  const conclutions = getConclutions(resultsAsText);

  return resultsAsText;
};
