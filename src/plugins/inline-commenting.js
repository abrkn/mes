const { likePostInBackground } = require('../memoApi');

function injectInlineCommenting() {
  $(`.post .actions .like-button`).click(e => {
    const $a = $(e.target);
    const $post = $a.closest('.post');
    const href = $a.attr('href');
    const txhash = href.match(/[^\/\?]+$/)[0]; // TODO: Duplicate
    const { memoPassword: password } = localStorage;

    const tipText = prompt('How much tip in satoshis? (Blank=0)', '0');

    if (tipText === null) {
      return false;
    }
    $post.addClass('is-liking');

    likePostInBackground(txhash, tipText)
      .then(() => {
        $post.removeClass('is-liking');
        $post.addClass('is-liked');
      })
      .catch(error => {
        $post.removeClass('is-liking');
        alert(`Failed to like: ${error.message || error.stack || error}!`);
      });

    return false;
  });
}

module.exports = injectInlineCommenting;
