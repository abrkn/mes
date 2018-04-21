const { get } = require('lodash');

function injectAutoExpandImages() {
  $('.post .message').each((_, message) => {
    const $message = $(message);
    const messageWidth = $message.width();
    const $a = $message.find('a');

    const getImgHtml = src =>
      //   `<img src="${$a.attr('href')}" style="max-width:${messageWidth -
      //     20}px;max-height:200px;display:block;margin:10px auto;" />`;

      // const $aToImg = $a.filter((_, a) =>
      //   $(a)
      //     .attr('href')
      //     .match(/\.(png|jpe?g|gif)$/i)
      // );
      // $aToImg.each((_, a) => $(a).html(getImgHtml()));

      $a.each((i, el) => {
        const $el = $(el);
        const href = $(el).attr('href');

        // Imgflip
        const imgFlipUrl = get(href.match(/https:\/\/imgflip.com\/([a-z0-9]{6,8})\//i), '0');

        if (imgFlipUrl) {
          alert('yay');
        }
      });
  });
}

module.exports = injectAutoExpandImages;
