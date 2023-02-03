const getBranchNameFromRef = (refString) => {
  const onlyRefs = refString
    .replace(/[(),]/g, ' ')
    .split(' ')
    .filter((r) => r.trim());
  const refWithOrigin = onlyRefs.find((r) => r.includes('origin'));
  return refWithOrigin ? refWithOrigin.replace('/origin', '') : '';
};

/**
 * @param {import("../types/gitLogEntry.js").GitLogEntry[] }logEntries
 * @return  {import("../types/gitLogEntry.js").GitLogEntry[] }
 * */
export const addBranchesToLogEntries = (logEntries) => {
  let lastBranchPushed = '';
  for (const entry of logEntries) {
    if (entry.branch) {
      lastBranchPushed = getBranchNameFromRef(entry.branch);
    } else {
      entry.branch = lastBranchPushed;
    }
  }
  return logEntries;
};
