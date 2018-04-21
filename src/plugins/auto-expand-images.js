function injectAutoExpandImages() {
  $('.post .message').each((_, message) => {
    const $message = $(message);
    const messageWidth = $message.width();
    const $a = $message.find('a');

    const $aToImg = $a.filter((_, a) =>
      $(a)
        .attr('href')
        .match(/\.(png|jpe?g|gif)$/i)
    );
    $aToImg.each((_, a) =>
      $(a).html(
        `<img src="${$a.attr('href')}" style="max-width:${messageWidth -
          20}px;max-height:200px;display:block;margin:10px auto;" />`
      )
    );
  });
}

module.exports = injectAutoExpandImages;
