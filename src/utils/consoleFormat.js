import { logToConsole } from './logToConsole.js';
// @ts-ignore
process.stdout.cursorTo = process.stdout.cursorTo || (() => {});
// @ts-ignore
process.stdout.write =
  process.stdout.write ||
  ((t) => {
    t && t.length > 1 ? logToConsole('') : null;
  });
// @ts-ignore
process.stdout.clearLine =
  process.stdout.clearLine ||
  (() => {
    logToConsole('');
  });

const colors = {
  reset: '\x1b[0m',
  bright: '\x1b[1m',
  dim: '\x1b[2m',
  underscore: '\x1b[4m',
  blink: '\x1b[5m',
  reverse: '\x1b[7m',
  hidden: '\x1b[8m',
  hideCursor: '\u001B[?25l',
  fg: {
    black: '\x1b[30m',
    red: '\x1b[31m',
    green: '\x1b[32m',
    yellow: '\x1b[33m',
    blue: '\x1b[34m',
    magenta: '\x1b[35m',
    cyan: '\x1b[36m',
    white: '\x1b[37m',
  },
  bg: {
    BGblack: '\x1b[40m',
    BGred: '\x1b[41m',
    BGgreen: '\x1b[42m',
    BGyellow: '\x1b[43m',
    BGblue: '\x1b[44m',
    BGmagenta: '\x1b[45m',
    BGcyan: '\x1b[46m',
    BGwhite: '\x1b[47m',
  },
};

/**@typedef {{color? : keyof typeof colors.fg, background? : keyof typeof colors.bg  } | keyof typeof colors.fg} logOptions */

export class TestFrameWorkConsole {
  constructor() {}

  animationOn = false;
  animationText = '';

  static log(...args) {
    logToConsole(...args);
  }

  /**@type {(ms: number, resolveWith? : any)=>Promise<any>} */
  static async wait(ms, resolveWith = true) {
    return new Promise((res, rej) => {
      setTimeout(() => {
        res(resolveWith);
      }, ms);
    });
  }

  static green(text) {
    TestFrameWorkConsole.print(text, { color: 'green' });
  }

  static red(text) {
    TestFrameWorkConsole.print(text, { color: 'red' });
  }

  /** @type {(text : string, options?: logOptions)=>void} */
  static print(text, options = undefined) {
    logToConsole(TestFrameWorkConsole.paint(text, options));
  }

  /** @type {(text : string, options?: logOptions)=>string} */

  static paint(text, argsOptions = undefined) {
    let options =
      typeof argsOptions === 'object'
        ? { ...argsOptions }
        : { color: argsOptions };

    const fg = options && options.color ? colors.fg[options.color] : '';
    const bg =
      options && options.background ? colors.bg[options.background] : '';
    const reset = colors.reset;
    return `${fg}${bg}${text}${reset}`;
  }

  static statusBar(len, pos, options = null) {
    if (pos === 0) {
      process.stdout.write('▒'.repeat(len));
      process.stdout.cursorTo(0);
      return;
    }
    process.stdout.cursorTo(pos - 1);
    process.stdout.write('▓');
  }

  static rewrite(text) {
    process.stdout.clearLine(0);
    process.stdout.cursorTo(0);
    process.stdout.write(text);
  }

  static async runAnimation() {
    const c = TestFrameWorkConsole;
    const wait = TestFrameWorkConsole.wait;
    const cubes = 40;
    const maxMsToPassOne = 50; // 150;
    const minMSTopassOne = 1;
    for (let i = 0; i <= cubes; i++) {
      c.statusBar(cubes, i);
      await wait(Math.random() * 100 > 90 ? maxMsToPassOne : minMSTopassOne);
    }
  }

  circleAnimation(action = 'AUTO', baseText = '', speed = 80) {
    if (this.animationOn && action === 'ON') {
      return;
    }
    this.animationOn =
      action === 'ON' || (action === 'AUTO' && !this.animationOn)
        ? true
        : false;

    if (!this.animationOn) {
      this.animationText = baseText || this.animationText;
      process.stdout.write(colors.hideCursor + ' ');
      process.stdout.cursorTo(0);
      process.stdout.write(
        this.animationText + TestFrameWorkConsole.paint(' ✔', 'green')
      );
      logToConsole('');
      this.animationText = '';

      return;
    }
    this.animationText = baseText;
    const lines = ['-', '/', '|', '\\'];
    let state = 0;
    let cursor = baseText.length + 2;
    let saftey = 0;

    const animate = () => {
      if (!this.animationOn || saftey++ > 100) {
        return;
      }
      state++;
      state = state < lines.length ? state : 0;
      process.stdout.write(colors.hideCursor + lines[state]);
      process.stdout.cursorTo(cursor);
      setTimeout(() => {
        animate();
      }, speed);
    };
    process.stdout.write(colors.hideCursor + baseText);
    process.stdout.cursorTo(cursor);
    animate();
  }
}
