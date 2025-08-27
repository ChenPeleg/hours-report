[![Status badge](https://github.com/ChenPeleg/hours-report/actions/workflows/ci-tests.yml/badge.svg?branch=main)](https://github.com/ChenPeleg/hours-report/actions/?query=branch%3Amain)  
[![npm version](https://badge.fury.io/js/hours-report.svg)](https://badge.fury.io/js/hours-report)  
[![License](https://img.shields.io/github/license/ChenPeleg/hours-report.svg?style=flat&colorA=18181B&colorB=28CF8D)](https://github.com/ChenPeleg/hours-report/LICENCE)  

# hours-report

An estimated time spent on a Git repository report.

*Please note that the information might not be accurate enough to be used for billing.*

---

## Usage

The package is written in 100% vanilla JavaScript without dependencies (excluding dev-dependencies) so that it can run on most versions of Node.js.  
It is recommended not to install it globally, but instead use:

```bash
npx hours-report
```

---

## Output

By default, the output is a CSV file like the following:  

![Report Example](https://chenpeleg.github.io/hours-report/assets/img/report-example.png)  

The file can then be opened in Excel, Google Sheets, etc.

---

## Options

**Usage:**
```bash
hours-report <options>
```

**Options:**
```
-e,   --email                        Email address. Default: current Git user email address
-mx,  --max-diff-for-session         Maximum difference in minutes between commits counted in one session. Default: 120
-mn,  --min-session                  Minimum minutes added for the first commit of a session. Default: 30
-df,  --date-from                    Analyze data since this date (Git log format). Default: always (max 1000 rows)
-du,  --date-until                   Analyze data until this date (Git log format). Default: now
-fr,  --format                       Output format: csv | console | xlsx. Default: xlsx
-o,   --output                       Output folder. Default: temp/hours-report
-p,   --path                         Git repository to analyze. Default: current folder (.)
-h,   --help                         Prints help options
```

**Examples:**

- Estimate hours for the current repository:
  ```bash
  hours-report
  ```

- Estimate hours in a repository where developers have long pauses (e.g., 4 hours) between commits:
  ```bash
  hours-report --max-diff-for-session=240
  ```

For more information, see [the documentation](https://chenpeleg.github.io/hours-report/).

---

## Inspirations

Inspired by:  
- [git-hours](https://github.com/kimmobrunfeldt/git-hours)  
- [git-time](https://github.com/vmf91/git-time)  
- And more...

---

## Support

### Running with npx

- [x] Node.js 12  
- [x] Node.js 14  
- [x] Node.js 16  
- [x] Node.js 18  
- [x] Node.js 20  

The package is written in vanilla JavaScript with no dependencies (only TypeScript as a dev dependency), allowing support for Node.js versions 12–18.

### Development

- [x] Node.js 19  

For development, use Node.js 18 or later.  
All tests are written with the Node.js test runner (available in these versions) and use type-related dev dependencies.

---

### Installation

```bash
npm i hours-report
```

### Unit Testing

Unit tests use the new *experimental* [Node.js test runner](https://nodejs.org/api/test.html):

```bash
npm test
```

### E2E Test

Contains only one test, used for CI purposes and Node.js version compatibility:

```bash
npm run e2e
```

---

## Fixes

**Version 1.1.6**  
Fixed [Issue #36](https://github.com/ChenPeleg/hours-report/issues/36)
