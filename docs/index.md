---
layout: page
# Index page
---

# Hours report
 
An Estimated time spent on a git repository report.

> Please note that the information might not be accurate enough to be used in billing.
{: .prompt-warning } 

## Usage

The best way to use it is to goto you project folder, and run: 

```console
$ npx hours-report
``` 

the console will output the location of a csv file that contains the report base on your git log. 

## Inspirations

Got the inspiration and many ideas
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




