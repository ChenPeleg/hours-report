import { platform } from 'os';
import child_process from 'child_process';

export const openExplorerIn = async (path) => {
  let cmd = '';
  switch (
    platform().toLowerCase().replace(/[0-9]/g, ``).replace(`darwin`, `macos`)
  ) {
    case `win`:
      path = path || '=';
      cmd = `explorer`;
      break;
    case `linux`:
      path = path || '/';
      cmd = `xdg-open`;
      break;
    case `macos`:
      path = path || '/';
      cmd = `open`;
      break;
  }
  let proccess = child_process.spawn(cmd, [path]);
  proccess.on('error', (err) => {
    proccess.kill();
  });
};
