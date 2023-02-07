[![Status badge](https://github.com/ChenPeleg/hours-report/actions/workflows/ci-tests.yml/badge.svg?branch=main)](https://github.com/ChenPeleg/hours-report/actions/?query=branch%3Amain)

# hours-report

An Estimated time spent on a git repository report.

*Please note that the information might not be accurate enough to be used in billing.*

## Usage

The package is written in 100% Vanilla js without dependencies (Not including dev-dependencies), to be able to run on
most versions of NodeJs.
That is why it's recommended not to install it but to use it like this:

`npx hour-report`

## Output

The output is default to output a csv file, that

![report-example](https://chenpeleg.github.io/hours-report/assets/img/report-example.png)

## Options

    Usage: hours-report <options>

    Options:
    -e,   --email                        email address. Default: current git user email address
    -mx,  --max-diff-for-session         maximum difference in minutes between commits counted to one session. Default: 120
    -mn,  --min-session                  how many minutes the first commit of a session should add to total. Default: 30
    -df,  --date-from                    Analyze data since certain date (git log format). default: always (with limit of 1000 rows)
    -du,  --date-until                   Analyze data until certain date (git log format). default: now
    -fr,  --format                       output format : 'csv' | 'console' | 'all'. Default: 'csv'
    -o,   --output                       output folder. Default: temp/hours-report
    -p,   --path                         Git repository to analyze. Default: . (current folder)
    -h,   --help                         prints help options

    Examples:

     - Estimate your hours for current repo

         $  hours-report 

     - Estimate hours in repository where developers commit more seldom: they might have 4h(240min) pause between commits

         $  hours-report  --max-diff-for-session=240

For more information see [the docs](https://chenpeleg.github.io/hours-report/).

## Inspirations

Got the inspiration
from [git-hours](https://github.com/kimmobrunfeldt/git-hours), [git-time](https://github.com/vmf91/git-time) and more.

## Support

### Running with npx

+ [x] Node.js 12
+ [x] Node.js 14
+ [x] Node.js 16
+ [x] Node.js 18

The package is written in vanilla JS so no dependencies (only Typescript as dev dependency).
This is so it can support version 12-18 of nodeJS.

### Development

+ [x] Node.js 19

To develop modify etc. use node 18 and above.
All the test are written in node test runner that is available for this version, and the types dev-dependencies.

#### Installation

```console
$ npm i hours-report
``` 

#### Unit testing

The unites testing is done with the new *experimental* [NodeJs test runner](https://nodejs.org/api/test.html).

```console
$ npm test
``` 

#### E2e test

contains only one test (used for CI purposes and to check node versions compatibility)

```console
$ npm run e2e
``` 

