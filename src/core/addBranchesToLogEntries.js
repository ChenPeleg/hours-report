/**
 * @param {import("../types/gitLogEntry.js").GitLogEntry[] }logEntries
 * @return  {import("../types/gitLogEntry.js").GitLogEntry[] }
 * */
export const addBranchesToLogEntries = (logEntries) => {
  for (const entry of logEntries) {
    if (entry.branch) {
      console.log(entry.branch);
    }
  }
  return logEntries;
};
