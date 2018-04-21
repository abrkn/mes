const { fetchTmXhr, fetchCsrf } = require("./memoFetch");
const injectInlineCommenting = require("./plugins/inline-commenting");
const { state, saveState } = require("./state");
const injectRememberPassword = require("./plugins/remember-password");
const injectAutoExpandImages = require("./plugins/auto-expand-images");

const addCss = () => {
  const element = document.createElement("style");
  element.innerText = require("../app.css");

  document.head.appendChild(element);
};

addCss();

$(() => {
  injectRememberPassword();

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

  injectAutoExpandImages();

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

  injectInlineCommenting();
});
