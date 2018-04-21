const { fetchTmXhr, fetchCsrf } = require("./memoFetch");
const injectInlineCommenting = require("./plugins/inline-commenting");
const { state, saveState } = require("./state");

const addCss = () => {
  const element = document.createElement("style");
  element.innerText = require("../app.css");

  document.head.appendChild(element);
};

addCss();

$(() => {
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

  injectInlineCommenting();
});
