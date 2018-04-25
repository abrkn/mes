#!/usr/bin/env node
const { version, name, author, homepage, description } = require('../package.json');
const { NODE_ENV } = process.env;

const nameSuffix = NODE_ENV && NODE_ENV !== 'production' ? `-${NODE_ENV}` : '';

console.log(`// ==UserScript==
// @name         ${name}${nameSuffix}
// @namespace    ${homepage}
// @version      ${version}
// @description  ${description}
// @author       ${author}
// @match        https://memo.cash/*
// @grant        GM_xmlhttpRequest
// ==/UserScript==`);
