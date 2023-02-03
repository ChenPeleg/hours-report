[![Status badge](https://github.com/ChenPeleg/hours-report/actions/workflows/ci-tests.yml/badge.svg?branch=main)](https://github.com/ChenPeleg/hours-report/actions/?query=branch%3Amain)

# hours-report

An Estimated time spent on a git repository report.

*Please note that the information might not be accurate enough to be used in billing.*

## Usage

The package is written in 100% Vanilla js without dependencies (Not including dev-dependencies), to be able to run on
most versions of NodeJs.
That is why it's recommended not to install it but to use it like this:

`npx hour-report`

Help

    Usage: hours-report <options>

    Options:
    -e,   --email                        email address. Default: current git user email address
    -mx,  --max-diff-for-session         maximum difference in minutes between commits counted to one session. Default: 120
    -mn,  --min-session                  how many minutes first commit of session should add to total. Default: 30
    -df,  --date-from                    Analyze data since certain date (git log format). default: always (with limit of 1000 rows)
    -du,  --date-until                   Analyze data until certain date (git log format). default: now
    -o,   --output                       output format : 'csv' | 'console' | 'all'. Default: 'csv'
    -p,   --path                         Git repository to analyze. Default: . (current folder)
    -h,   --help                         prints help options

    Examples:

     - Estimate your hours for current repo

         $  hours-report 

     - Estimate hours in repository where developers commit more seldom: they might have 4h(240min) pause between commits

         $  hours-report  --max-diff-for-session=240

## How it works

A short explanation on how hours are estimated:

to be continued...

## Inspirations

Got the inspiration
from [git-hours](https://github.com/kimmobrunfeldt/git-hours), [git-time](https://github.com/vmf91/git-time) and more.

