---
title : how to use
icon: fas fa-archive
order: 3
--- 
## Basic usage

The package is written in 100% Vanilla js without dependencies (Not including dev-dependencies), to be able to run on most versions of NodeJs. That is why it's recommended not to install it but to use it like this:

```console
$ npx hours-report <options>
``` 

when run without options it should be run inside a git repository:

- The username will come from the `git config` data.
- The git repo will be the first repo that the `git log` command will find. 
- The output will be in a csv format and the file will be saved in the temp folder. 
- 
## Options

These are the options, with which you can change the default behaviour:

```text
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
``` 

## Examples

### Changing the algorithm settings

Estimate hours in repository where developer works about 1.5 hours before first commit 

```console
$ npx hours-report --min-session=90
``` 

Estimate hours in repository where developers commit more seldom: they might have 4h(240min) pause between commits

```console
$ npx hours-report --max-diff-for-session=240
``` 

Estimate hours in repository where commits are short and quick with no more than an hour (60min) pause between commits

```console
$ npx hours-report --max-diff-for-session=60
``` 

### From and To Date

These uses the git log [--until](https://git-scm.com/docs/git-log#Documentation/git-log.txt---untilltdategt)
and [--since](https://git-scm.com/docs/git-log#Documentation/git-log.txt---sinceltdategt). 

```console
$ npx hours-report --date-from="2-2-23"
``` 
### Output

To output the information only to the console, without generating a csv file, use:
```console
$ npx hours-report --output=console"
``` 
