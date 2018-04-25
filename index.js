// ==UserScript==
// @name         mes
// @namespace    https://github.com/abrkn/mes#readme
// @version      0.3.16
// @description  Memo Enhancement Suite (MES)
// @author       Andreas Brekken: https://memo.cash/profile/149o1esm1LrYEy1DizZgxANSppx3FESHKw
// @match        https://memo.cash/*
// @grant        GM_xmlhttpRequest
// ==/UserScript==

$(function() {
  alert(
    `Sorry to disturb! You need to manually upgrade MES.\nYou will now be sent to a website with instructions`
  );

  window.location.href = 'https://github.com/abrkn/mes/blob/master/UPGRADE.md#upgrade-guide';
});
