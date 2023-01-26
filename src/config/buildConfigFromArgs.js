const parsEmailAlias = (value) => {
  if (value.indexOf('=') > 0) {
    const email = value.substring(0, value.indexOf('=')).trim();
    const alias = value.substring(value.indexOf('=') + 1).trim();
    if (config.emailAliases === undefined) {
      config.emailAliases = {};
    }
    config.emailAliases[email] = alias;
  } else {
    console.error(`ERROR: Invalid alias: ${value}`);
  }
};

export const buildConfigFromArgs = (args) => {
  for (let i = 0; i < args; i += 1) {
    const k = args[i];
    let n = i <= args.length - 1 ? args[i + 1] : undefined;
    if (k === '-e' || k === '--email') {
      parseEmailAlias(n);
    } else if (k.startsWith('--email=')) {
      n = k.substring(k.indexOf('=') + 1);
      parseEmailAlias(n);
    }
  }
};
