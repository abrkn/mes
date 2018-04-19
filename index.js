// ==UserScript==
// @name         Auto-fill Memo-cash password
// @namespace    https://tampermonkey.net/
// @version      0.3.0
// @description  Auto-fill Memo.cash Password with Tampermonkey for Chrome
// @author       Andreas Brekken: https://memo.cash/profile/149o1esm1LrYEy1DizZgxANSppx3FESHKw
// @match        https://memo.cash/*
// @grant        none
// ==/UserScript==

$(() => {
  // Remember password
  $('[type="password"]').each((_, password) => {
    // Load
    $(password).val(localStorage.memoPassword || '');

    // Save
    $(password)
      .closest('form')
      .submit(() => {
        localStorage.memoPassword = $(password).val();
      });
  });

  // Only tip in integers with a minimum of what is stated: "(min. 123)"
  $('input#tip').attr({
    type: 'number',
    pattern: 'd*',
    min: $('#form-memo-like label[for="tip"]')
      .text()
      .match(/(\d+)\)/)[1],
  });
});
