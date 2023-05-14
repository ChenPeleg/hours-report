import { resolve } from "path";
import {
  copyFilesToTempDir,
  deleteFilesFromDir,
  runZipper,
} from "./xlsx-utils.js";
import { createFileObjectFromSheets } from "./xlsxCreateWorkbookObject.js";

/**
 * @param {import("../types/worksheet.types.js").Workbook} data
 * @param {{ tempDir: string; outDir: string }} config
 */
export const main = async (data, config) => {
  const tempDir = config?.tempDir || "temp";
  const outDir = config?.outDir || "out";
  await deleteFilesFromDir(resolve(tempDir));
  const workbookObject = data || { name: "empty_workbook", sheets: [] };
  const xlsObject = createFileObjectFromSheets(workbookObject);
  await copyFilesToTempDir(xlsObject, resolve(tempDir));
  await deleteFilesFromDir(outDir);
  await runZipper(workbookObject.name, tempDir, outDir);
};
