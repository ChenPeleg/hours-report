import { main } from "./core/xlsx-main.js";
import path from "path";
import { tmpdir } from "os";

/**
 * @param {import("./types/worksheet.types.js").Workbook} data
 * @param {string} tempDir
 * @param {string} outDir
 * @returns {Promise<void>}
 */
export const exportToXls = async (data, tempDir, outDir) => {
  await main(data, { tempDir, outDir });
};
