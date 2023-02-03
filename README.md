[![Status badge](https://github.com/ChenPeleg/hours-report/actions/workflows/ci-tests.yml/badge.svg?branch=main)](https://github.com/ChenPeleg/hours-report/actions/?query=branch%3Amain)

# git-hours

An Estimated time spent on a git repository report.

*Please note that the information might not be accurate enough to be used in billing.*

## Usage

The package is written in 100% Vanilla js without dependencies (Not including dev-dependencies), to be able to run on
most versions of NodeJs.
That is why it's recommended not to install it but to use it like this:

`npx hour-report`

## How it works

A short explanation on how hours are estimated:

<br><br>

![](docs/step0.png)

*Go through all commits and compare the difference between
them in time.*

<br><br><br>

![](docs/step1.png)

*If the difference is smaller or equal then a given threshold, group the commits
to a same coding session.*

<br><br><br>

![](docs/step2.png)

*If the difference is bigger than a given threshold, the coding session is finished.*

<br><br><br>

![](docs/step3.png)

*To compensate the first commit whose work is unknown, we add extra hours to the coding session.*

<br><br><br>

![](docs/step4.png)

*Continue until we have determined all coding sessions and sum the hours
made by individual authors.*

<br>

The algorithm
in [~30 lines of code](https://github.com/kimmobrunfeldt/git-hours/blob/8aaeee237cb9d9028e7a2592a25ad8468b1f45e4/index.js#L114-L143).

## Usage

In root of a git repository run:

    $ git-hours

**Note: repository is not detected if you are not in the root of repository!**

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

     - Estimate hours in repository where developer works 5 hours before first commit in day

         $  hours-report  --first-commit-add 300

     - Estimate hours work in repository since yesterday

       $ git-hours --since yesterday

     - Estimate hours work in repository since 2015-01-31

       $ git-hours --since 2015-01-31
 

    For more details, visit https://github.com/kimmobrunfeldt/git-hours

# hours-report

Hours report based on git

## Inspirations

Got the inspiration
from [git-hours](https://github.com/kimmobrunfeldt/git-hours), [git-time](https://github.com/vmf91/git-time) and more.

