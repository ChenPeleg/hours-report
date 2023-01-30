const GIT_LOG_SEPARATOR = '\n*';

const gitLogLineToEntry = (line) => {
  const lineElements = line.split(' ');
  const date = lineElements[0];
  const time = lineElements[1];
  const timeZone = lineElements[2];
  const email = lineElements[3];
  const comment = lineElements.filter((elm, i) => i > 3).join(' ');
};

const parseGitLogToEntries = (gitLogAsString) => {
  const lines = gitLogAsString.split(GIT_LOG_SEPARATOR);
  const entries = lines.map((line) => gitLogLineToEntry(line));
};
