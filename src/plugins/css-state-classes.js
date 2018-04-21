const { state, saveState } = require("../state");

function injectCssStateClasses() {
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
}

module.exports = injectCssStateClasses;
