import { resolve } from "path";
import {
  copyFilesToTempDir,
  deleteFilesFromDir,
  runZipper,
} from "./xlsx-utils.js";
import { xlsContentBuilder } from "./xlsxContentBuilder.js";
import { createFileObjectFromSheets } from "./xlsxCreateWorkbookObject.js";
import { TestUtils } from "../../test/utils/test-utils.js";

/**
 * @param {import("../types/worksheet.types.js").Workbook} data
 * @param {{ tempDir: string; outDir: string }} config
 */
export const main = async (data, config) => {
  const tempDir = config?.tempDir || "temp";
  const outDir = config?.outDir || "out";
  await deleteFilesFromDir(resolve(tempDir));
  const workbookObject = data || TestUtils.buildExampleSheetsData();
  const xlsObject = createFileObjectFromSheets(workbookObject);
  await copyFilesToTempDir(xlsObject, resolve(tempDir));
  await deleteFilesFromDir(outDir);
  await runZipper(workbookObject.name, outDir);
};
