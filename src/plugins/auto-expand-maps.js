const { googleApiKey } = require('../../config.json');

function injectAutoExpandMaps() {
  $('.post .message').each((_, message) => {
    const $message = $(message);
    const messageWidth = $message.width();
    const mapWidth = messageWidth - 20;

    // Map short-hand
    const prevHtml = $message.html();

    let nextHtml = prevHtml;

    nextHtml = nextHtml.replace(
      /map!(-?[0-9\.]+,-?[0-9\.]+),([0-9]+z)/g,
      `<iframe src="https://www.google.com/maps/embed/v1/view?key=${googleApiKey}&center=$1&zoom=18&maptype=roadmap" width="${mapWidth}" height="350" frameborder="0" style="border:0" allowfullscreen></iframe>`
    );

    if (nextHtml !== prevHtml) {
      $message.html(nextHtml);
    }
  });
}

module.exports = injectAutoExpandMaps;
