import { appendFileSync } from 'fs';
import path from 'path';

/**
 * @param { string } csvText
 * @param {import('../types/reportConfigurations.js').ReportConfigurations} config
 * @return {Promise<string>}
 */
export const saveToCsvFile = async (csvText, config) => {
  const fileName = `hours-report` + ((Math.random() * 1000) | 0);
  appendFileSync(
    path.resolve(config.PathToRepo, `./output/${fileName}.csv`),
    csvText
  );
  return path.resolve(`./output/${fileName}.csv`);
};
