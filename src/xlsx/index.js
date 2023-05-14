import { main } from "./core/xlsx-main.js";

/**
 * @param {import("./types/worksheet.types.js").Workbook} data
 * @param {string} tempDir
 * @param {string} outDir
 * @returns {Promise<void>}
 */
export const exportToXls = async (data, tempDir, outDir) => {
  return await main(null, { tempDir: tempDir, outDir: outDir });
};
