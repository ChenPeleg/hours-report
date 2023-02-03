import { appendFileSync } from 'fs';

export const saveToCsvFile = async (csvText, report) => {
  const fileName = `hours-report` + ((Math.random() * 1000) | 0);
  try {
    appendFileSync(`./output/${fileName}.csv`, csvText);
  } catch (err) {
    console.error(err);
  }
};
