// ==UserScript==
// @name         MES
// @namespace    https://tampermonkey.net/
// @version      0.3.7
// @description  Memo Enhancement Suite
// @author       Andreas Brekken: https://memo.cash/profile/149o1esm1LrYEy1DizZgxANSppx3FESHKw
// @match        https://memo.cash/*
// @grant        GM_xmlhttpRequest
// ==/UserScript==

const THUMBS_UP = '👍';
const HOURGLASS = '⌛';
const MES_STORAGE_KEY = 'mes-7932a97f';

const state = JSON.parse(localStorage[MES_STORAGE_KEY] || '{}');

// Defaults for state
Object.assign(state, {
  likedPosts: state.likedPosts || {},
});

console.log({ state });

const saveState = () => {
  localStorage[MES_STORAGE_KEY] = JSON.stringify(state, null, 2);
};

$(() => {
  // Add CSS
  $(`
    <style>
      .is-disabled,
      .post.is-liking .actions .like-button,
      .post.is-liked .actions .like-button
      {
        pointer-events: none;
        cursor: not-allowed;
      }

      .post.is-liking .actions .like-button {
        background-color: rgba(84,141,29,0.75);
      }

      .post.is-liked .actions .like-button {
        background-color: rgba(0,0,0,0.2);
      }

      /* "Like Memo" button texts */
      .post .actions .like-button:after {
        content: "Like Memo";
      }

      .post.is-liking .actions .like-button:after {
        content: "${HOURGLASS} Liking Memo...";
      }

      .post.is-liked .actions .like-button:after {
        content: "${THUMBS_UP} Liked Memo!";
      }

      body .btn {
          background: #99c261;
          border: 0;
          border-radius: 50px;
          color: #fff;
          padding: 8px 12px;
          margin: 5px 0;
          transition: background-color 0.25s ease;
      }

      body .btn:hover, .btn:focus {
          background: #bfe498;
      }

      body .btn-leave {
          background: #b5b5b5;
      }

      body .btn-leave:hover, .btn-leave:focus {
          background: #999;
      }

      body table {
          margin: 0 auto;
      }

      body table.table td {
          border-radius: 0px;
          margin: 5px;
          padding: 20px;
      }

      body table.table th {
          border-radius: 0;
      }

      body .header h1 {
          display: block;
          text-align: center;
          margin: 15px 0;
      }

      body .header, body {
          text-align: center;
      }

      body .post {
          box-shadow: none;
          border: 1px solid #ddd;
          background: #eee;
          margin: 25px auto;
      }


    </style>
  `).appendTo('head');

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

  // Add missing css class to "Like Memo" buttons
  $(`.post .actions a[href^='memo/like']`).addClass('like-button');

  // Add data-txhash to posts
  $(`.post .actions .like-button`).each((_, a) => {
    const $a = $(a);
    const $post = $a.closest('.post');
    const href = $a.attr('href');
    const txhash = href.match(/[^\/\?]+$/)[0];
    $post.attr('data-txhash', txhash);
  });

  // Remove "Like Memo", which will be done by CSS instead
  $(`.post .actions .like-button`).html('');

  // Restore likes
  $('.post[data-txhash]').each((_, post) => {
    const $post = $(post);
    const txhash = $post.attr('data-txhash');

    $post.toggleClass('is-liked', !!state.likedPosts[txhash]);
  });

  // In-line-comment
  $(`.post .actions .like-button`).click(e => {
    const $a = $(e.target);
    const $post = $a.closest('.post');
    const href = $a.attr('href');
    const txHash = href.match(/[^\/\?]+$/)[0]; // TODO: Duplicate
    const { memoPassword: password } = localStorage;

    const tipText = prompt('How much tip in satoshis? (Blank=0)', '0');

    if (tipText === null) {
      return false;
    }

    // A zero tip is sent as blank
    const tip = (+tipText || '').toString();

    $post.addClass('is-liking');

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
          data: `txHash=${txHash}&tip=${tip}&password=${password}`,
          onerror: error => reject(error),
          overrideMimeType: 'application/x-www-form-urlencoded; charset=UTF-8',
          headers: {
            'content-type': 'application/x-www-form-urlencoded; charset=UTF-8',
            'x-csrf-token': `${csrf}`,
            referer: `${href}`,
          },
          onload: res => {
            console.log(res);

            const prevTip = state.likedPosts[txHash]
              ? state.likedPosts[txHash].tip || 0
              : 0;

            state.likedPosts[txHash] = {
              timestamp: +new Date(),
              tip: prevTip + +tip,
            };

            saveState();

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
        $post.removeClass('is-liking');
        $post.addClass('is-liked');
      })
      .catch(error => {
        $post.removeClass('is-liking');
        console.error('oops');
        console.error(error, error.stack || error.message);
      });

    return false;
  });
});
