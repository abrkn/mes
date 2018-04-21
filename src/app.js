// ==UserScript==
// @name         MES
// @namespace    https://tampermonkey.net/
// @version      0.3.9
// @description  Memo Enhancement Suite
// @author       Andreas Brekken: https://memo.cash/profile/149o1esm1LrYEy1DizZgxANSppx3FESHKw
// @match        https://memo.cash/*
// @grant        GM_xmlhttpRequest
// ==/UserScript==

const { fetchTmXhr, fetchCsrf } = require("./memoFetch");

const MES_STORAGE_KEY = "mes-7932a97f";

const state = JSON.parse(localStorage[MES_STORAGE_KEY] || "{}");

const likePostInBackground = async (txhash, tip = 0) => {
  const { memoPassword: password } = localStorage;
  const csrf = await fetchCsrf(`memo/like/${txhash}`);
  const tipForQuery = (+tip || "").toString();

  await fetchTmXhr({
    url: "memo/like-submit",
    data: `txHash=${txhash}&tip=${tipForQuery}&password=${password}`,
    csrf
  });

  const prevTip = state.likedPosts[txhash] ? state.likedPosts[txhash].tip || 0 : 0;

  state.likedPosts[txhash] = {
    timestamp: +new Date(),
    tip: prevTip + +tip
  };

  saveState();
};

const addCss = () => {
  const element = document.createElement("style");
  element.innerText = require("../app.css");

  document.head.appendChild(element);
};

addCss();

// Defaults for state
Object.assign(state, {
  likedPosts: state.likedPosts || {}
});

console.log({ state });

const saveState = () => {
  localStorage[MES_STORAGE_KEY] = JSON.stringify(state, null, 2);
};

$(() => {
  // Add CSS
  $(`

    </style>
  `).appendTo("head");

  // Remember password
  $('[type="password"]').each((_, password) => {
    // Load
    $(password).val(localStorage.memoPassword || "");

    // Save
    $(password)
      .closest("form")
      .submit(() => {
        localStorage.memoPassword = $(password).val();
      });
  });

  const $formMemoLike = $("#form-memo-like");

  if ($formMemoLike.length) {
    // Only tip in integers with a minimum of what is stated: "(min. 123)"
    $formMemoLike.find("input#tip").attr({
      type: "number",
      pattern: "d*",
      min: $('#form-memo-like label[for="tip"]')
        .text()
        .match(/(\d+)\)/)[1]
    });
  }
  // Auto expand images
  $(".post .message").each((_, message) => {
    const $message = $(message);
    const messageWidth = $message.width();
    const $a = $message.find("a");

    const $aToImg = $a.filter((_, a) =>
      $(a)
        .attr("href")
        .match(/\.(png|jpe?g|gif)$/i)
    );
    $aToImg.each((_, a) => $(a).html(`<img src="${$a.attr("href")}" style="max-width:${messageWidth - 20}px;max-height:200px;display:block;margin:10px auto;" />`));
  });

  // Add missing css class to "Like Memo" buttons
  $(`.post .actions a[href^='memo/like']`).addClass("like-button");

  // Add data-txhash to posts
  $(`.post .actions .like-button`).each((_, a) => {
    const $a = $(a);
    const $post = $a.closest(".post");
    const href = $a.attr("href");
    const txhash = href.match(/[^\/\?]+$/)[0];
    $post.attr("data-txhash", txhash);
  });

  // Remove "Like Memo", which will be done by CSS instead
  $(`.post .actions .like-button`).html("");

  // Restore likes
  $(".post[data-txhash]").each((_, post) => {
    const $post = $(post);
    const txhash = $post.attr("data-txhash");

    $post.toggleClass("is-liked", !!state.likedPosts[txhash]);
  });

  // In-line-comment
  $(`.post .actions .like-button`).click(e => {
    const $a = $(e.target);
    const $post = $a.closest(".post");
    const href = $a.attr("href");
    const txhash = href.match(/[^\/\?]+$/)[0]; // TODO: Duplicate
    const { memoPassword: password } = localStorage;

    const tipText = prompt("How much tip in satoshis? (Blank=0)", "0");

    if (tipText === null) {
      return false;
    }
    $post.addClass("is-liking");

    likePostInBackground(txhash, tipText)
      .then(() => {
        $post.removeClass("is-liking");
        $post.addClass("is-liked");
      })
      .catch(error => {
        $post.removeClass("is-liking");
        alert(`Failed to like: ${error.message || error.stack || error}!`);
      });

    return false;
  });
});
