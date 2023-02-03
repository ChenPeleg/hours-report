const getBranchNameFromRef = (refString) => {
  const onlyRefs = refString
    .replace(/[(),]/g, ' ')
    .split(' ')
    .filter((r) => r.trim());
  console.log(onlyRefs);
};

/**
 * @param {import("../types/gitLogEntry.js").GitLogEntry[] }logEntries
 * @return  {import("../types/gitLogEntry.js").GitLogEntry[] }
 * */
export const addBranchesToLogEntries = (logEntries) => {
  for (const entry of logEntries) {
    if (entry.branch) {
      getBranchNameFromRef(entry.branch);
      // console.log(entry.branch);
    }
  }
  return logEntries;
};
