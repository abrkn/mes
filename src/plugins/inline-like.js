const { likePostInBackground } = require('../memoApi');

function injectInlineLike() {
  $(`.post .actions`).each((i, actions) => {
    const $actions = $(actions);
    const $post = $actions.closest('.post');

    const $likeTip = $('<div class="like-tip">');

    const $input = $('<input class="form-control" placeholder="Sats">');

    $input.on('keypress', e => {
      if (e.keyCode === 13) {
        $post.find('.like-button').trigger('click');
      }
      return true;
    });
    $likeTip.append($input);

    $likeTip.insertBefore($actions.find('.like-button'));
  });

  $(`.post .actions .like-button`).click(e => {
    const $a = $(e.target);
    const $post = $a.closest('.post');
    const href = $a.attr('href');
    const txhash = href.match(/[^\/\?]+$/)[0]; // TODO: Duplicate

    if (!$post.hasClass('is-showing-like-tip')) {
      $post.addClass('is-showing-like-tip');
      $post.find('.like-tip input').focus();
      return false;
    }

    const $likeTip = $post.find('.like-tip input');
    const likeTip = $likeTip.val() || '0';

    $post.addClass('is-liking');

    likePostInBackground(txhash, likeTip)
      .then(() => {
        $post.addClass('is-liked');
      })
      .catch(error => {
        alert(`Failed to like: ${error.message || error.stack || error}!`);
      })
      .finally(() => {
        $post.removeClass('is-liking').removeClass('is-showing-like-tip');
      });

    return false;
  });
}

module.exports = injectInlineLike;
