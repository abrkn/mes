const { replyToPostInBackground } = require('../memoApi');

function injectInlineReply() {
  $(`.post .actions .reply-button`).click(e => {
    const $a = $(e.target);
    const $post = $a.closest('.post');
    const href = $a.attr('href');
    const txhash = href.match(/[^\/\?]+$/)[0]; // TODO: Duplicate

    const replyText = prompt('Enter your reply. Max 39 characters', '');

    if (replyText === null) {
      return false;
    }
    $post.addClass('is-replying');

    replyToPostInBackground(txhash, replyText)
      .then(() => {
        $post.removeClass('is-replying');
        $post.addClass('is-replied');
      })
      .catch(error => {
        $post.removeClass('is-replying');
        alert(`Failed to like: ${error.message || error.stack || error}!`);
      });

    return false;
  });
}

module.exports = injectInlineReply;
