#! /usr/bin/env node

import { main } from '../src/index.js';

console.log('from bin');
main().then((results) => results);
