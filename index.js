// ==UserScript==
// @name         Auto-fill Memo-cash password
// @namespace    https://tampermonkey.net/
// @version      0.3.0
// @description  Auto-fill Memo.cash Password with Tampermonkey for Chrome
// @author       Andreas Brekken: https://memo.cash/profile/149o1esm1LrYEy1DizZgxANSppx3FESHKw
// @match        https://memo.cash/*
// @grant        none
// ==/UserScript==

$(() =>
  $('[type="password"]').each((_, password) => {
    // Load
    $(password).val(localStorage.memoPassword || '');

    // Save
    $(password)
      .closest('form')
      .submit(() => (localStorage.memoPassword = $(password).val()));
  })
);
