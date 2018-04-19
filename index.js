// ==UserScript==
// @name         MES
// @namespace    https://tampermonkey.net/
// @version      0.3.4
// @description  Memo Enhancement Suite
// @author       Andreas Brekken: https://memo.cash/profile/149o1esm1LrYEy1DizZgxANSppx3FESHKw
// @match        https://memo.cash/*
// @grant        GM_xmlhttpRequest
// ==/UserScript==

$(() => {
  // Remember password
  $('[type="password"]').each((_, password) => {
    // Load
    $(password).val(localStorage.memoPassword || '');

    // Save
    $(password)
      .closest('form')
      .submit(() => {
        localStorage.memoPassword = $(password).val();
      });
  });

  const $formMemoLike = $('#form-memo-like');

  if ($formMemoLike.length) {
    // Only tip in integers with a minimum of what is stated: "(min. 123)"
    $formMemoLike.find('input#tip').attr({
      type: 'number',
      pattern: 'd*',
      min: $('#form-memo-like label[for="tip"]')
        .text()
        .match(/(\d+)\)/)[1],
    });
  }

  // Auto expand images
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
          20}px;max-height:200px;" />`
      )
    );
  });

  // In-line-comment
  $(`.post .actions a[href^='memo/like']`).click(e => {
    const $a = $(e.target);
    const href = $a.attr('href');
    const txHash = href.match(/[^\/\?]+$/)[0];
    const { memoPassword: password } = localStorage;

    $a.text('Liking Memo...');
    $a.css('background-color', '#544c40');

    const fetchLikePageAndGetCsrf = () =>
      new Promise((resolve, reject) => {
        const url = 'https://memo.cash/' + href;

        console.log(`Fetching like page to get CSRF at ${url}...`);

        const res = GM_xmlhttpRequest({
          method: 'GET',
          url,
          onerror: error => reject(error),
          onload: res => {
            console.log(res);
            console.log(res.responseText);
            const csrf = res.responseText.match(/MemoApp.InitCsrf."([^"]+)/)[1];
            resolve(csrf);
          },
        });
      });

    const likePost = csrf =>
      new Promise((resolve, reject) => {
        console.log({ csrf });

        const req = {
          method: 'POST',
          url: 'https://memo.cash/memo/like-submit',
          data: `txHash=${txHash}&tip=&password=${password}`,
          onerror: error => reject(error),
          overrideMimeType: 'application/x-www-form-urlencoded; charset=UTF-8',
          headers: {
            'content-type': 'application/x-www-form-urlencoded; charset=UTF-8',
            'x-csrf-token': `${csrf}`,
            referer: `${href}`,
          },
          onload: res => {
            console.log(res);
            resolve(res.responseText);
          },
        };

        console.log({ req });

        const res = GM_xmlhttpRequest(req);
      });

    Promise.resolve(1)
      .then(fetchLikePageAndGetCsrf)
      .then(likePost)
      .then(() => {
        $a.text('Liked Memo!');
        $a.attr('disabled', 'true');
        $a.css('background-color', 'rgb(0, 0, 0, 0.2)');
      })
      .catch(error => {
        console.error('oops');
        console.error(error, error.stack || error.message);
      });

    return false;
  });
});
