import { resolve } from "node:path";
import { platform } from "node:os";
import { rename } from "node:fs/promises";
import { exec } from "child_process";
import fs, { existsSync, mkdirSync, writeFileSync } from "node:fs";
import { TestFrameWorkConsole } from "../../utils/consoleFormat.js";

export const deleteFilesFromDir = async (directory = "temp") => {
  const dir = resolve(directory);
  if (existsSync(dir)) {
  }
  try {
    fs.rmSync(dir, { recursive: true, force: true });

    fs.mkdirSync(dir, { recursive: true });
  } catch (e) {
    if (e.toString().includes("Error: EBUSY: resource busy or locked")) {
      console.error(
        TestFrameWorkConsole.paint(
          `*****  Error   *****\n The file is open in another program, please close ${directory} \n `,
          { color: "red", background: "BGblack" }
        )
      );
      process.exit(1);
    }
  }
};

export const execPromise = async (command, extraParams = {}) => {
  return new Promise(function (resolve, reject) {
    exec(command, extraParams, (error, stdout, stderr) => {
      if (error) {
        reject(error);
        return;
      }
      resolve(stdout.trim());
    });
  });
};

const renameFile = async (oldPath, newPath) => {
  const res = await rename(oldPath, newPath);
  return res;
};

/** @param {string} fileName */
/**
 * @param {string} fileName
 * @param {string} tempDir
 * @param {string} outDir
 */
export const runZipper = async (
  fileName = "workbook",
  tempDir = "temp",
  outDir = "out"
) => {
  if (platform() === "win32") {
    const psCommand = `Compress-Archive -Path * -DestinationPath ${resolve(
      outDir
    )}/${fileName}.zip`;
    const res = await execPromise(psCommand, {
      cwd: tempDir,
      shell: "powershell.exe",
    });
  } else {
    const psCommand = `cd ${resolve(tempDir)} && zip -r ${resolve(
      outDir
    )}/${fileName}.zip ./*`;
    const res = await execPromise(psCommand);
    console.log(res);
  }

  await renameFile(`${outDir}/${fileName}.zip`, `${outDir}/${fileName}.xlsx`);
};
/**
 * @param {Record<string, { url: string[]; content: string }>} fileObject
 * @param {any} tempDir
 */
export const copyFilesToTempDir = (fileObject, tempDir) => {
  for (const file in fileObject) {
    const dir = resolve(tempDir, ...fileObject[file].url.slice(0, -1));

    mkdirSync(dir, { recursive: true });

    writeFileSync(
      resolve(tempDir, ...fileObject[file].url),
      fileObject[file].content,
      { flag: "w", encoding: "utf8" }
    );
  }
};
