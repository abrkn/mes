const get = require('lodash.get');

function injectAutoExpandImages() {
  $('.post .message').each((_, message) => {
    const $message = $(message);
    const messageWidth = $message.width();
    const $a = $message.find('a');

    const createImg = src =>
      $(
        `<img src="${src}" className="is-mes-expanded-media" style="max-width:${messageWidth}px;max-height:200px;display:block;margin:10px auto;" />`
      );

    $a.each((i, el) => {
      const $el = $(el);
      const href = $(el).attr('href');

      // Direct
      const directImg = get(href.match(/^.+\.(png|jpe?g|gif)$/i), '0');

      if (directImg) {
        $el.html(createImg(directImg));
      }

      // Imgflip
      const imgFlipId = get(href.match(/https?:\/\/imgflip\.com\/i\/([a-z0-9]{6,8})/i), '1');

      if (imgFlipId) {
        const imgFlipSrc = `https://i.imgflip.com/${imgFlipId}.jpg`;
        $el.html(createImg(imgFlipSrc));
      }
    });

    // YouTube short-hand
    const prevHtml = $message.html();

    let nextHtml = prevHtml;

    nextHtml = nextHtml.replace(
      /yt!([0-9a-z]{9,12})/i,
      '<iframe src="https://www.youtube.com/embed/$1?html5=1" width=414 height=233 style="margin:10px auto; display:block;border:0;"></iframe>'
    );

    if (nextHtml !== prevHtml) {
      $message.html(nextHtml);
    }
  });
}

module.exports = injectAutoExpandImages;
