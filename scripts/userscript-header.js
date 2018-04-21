#!/usr/bin/env node
const { version, name, author, homepage, description } = require("../package.json");

console.log(`// ==UserScript==
// @name         ${name}
// @namespace    ${homepage}
// @version      ${version}
// @description  ${description}
// @author       ${author}
// @match        https://memo.cash/*
// @grant        GM_xmlhttpRequest
// ==/UserScript==`);
