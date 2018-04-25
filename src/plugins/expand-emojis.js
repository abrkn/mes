const emoji = require('node-emoji');

function injectExpandEmojis() {
  $('.post .message').each((_, message) => {
    const $message = $(message);
    const prevHtml = $message.html();
    const nextHtml = emoji.emojify(prevHtml, _ => _);

    if (prevHtml !== nextHtml) {
      $message.html(nextHtml);
    }
  });
}

module.exports = injectExpandEmojis;
