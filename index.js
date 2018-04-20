// ==UserScript==
// @name         MES
// @namespace    https://tampermonkey.net/
// @version      0.3.8
// @description  Memo Enhancement Suite
// @author       Andreas Brekken: https://memo.cash/profile/149o1esm1LrYEy1DizZgxANSppx3FESHKw
// @match        https://memo.cash/*
// @grant        GM_xmlhttpRequest
// ==/UserScript==

const THUMBS_UP = '👍';
const HOURGLASS = '⌛';
const MES_STORAGE_KEY = 'mes-7932a97f';

const state = JSON.parse(localStorage[MES_STORAGE_KEY] || '{}');

const fetchTmXhr = req =>
  new Promise((resolve, reject) => {
    if (!req.url.match(/^http/)) {
      req.url = `https://memo.cash/${req.url}`;
    }

    console.log(`Fetching ${req.url} to get CSRF...`);

    GM_xmlhttpRequest(
      Object.assign(
        {
          method: req.data ? 'POST' : 'GET',
          ...(req.data
            ? {
                overrideMimeType:
                  'application/x-www-form-urlencoded; charset=UTF-8',
              }
            : {}),
          headers: {
            ...(req.csrf ? { 'x-csrf-token': `${req.csrf}` } : {}),
            // ...(req.data ? { referer: req.url } : {}),
          },
          onerror: error => reject(error),
          onload: res => {
            const { readyState, responseText } = res;

            if (res.readyState !== 4) {
              reject(
                `readyState=${readyState}; responseText: ${responseText || ''}`
              );
              return;
            }

            console.log(`Fetched ${req.url}`);

            resolve(responseText);
          },
        },
        req
      )
    );
  });

const fetchCsrf = url =>
  fetchTmXhr({ url }).then(text => text.match(/MemoApp.InitCsrf."([^"]+)/)[1]);

const likePostInBackground = async (txhash, tip = 0) => {
  const { memoPassword: password } = localStorage;
  const csrf = await fetchCsrf(`memo/like/${txhash}`);
  const tipForQuery = (+tip || '').toString();

  await fetchTmXhr({
    url: 'memo/like-submit',
    data: `txHash=${txhash}&tip=${tipForQuery}&password=${password}`,
    csrf,
  });

  const prevTip = state.likedPosts[txhash]
    ? state.likedPosts[txhash].tip || 0
    : 0;

  state.likedPosts[txhash] = {
    timestamp: +new Date(),
    tip: prevTip + +tip,
  };

  saveState();
};

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

      body #profile-list .btn {
          border-radius: 0;
          background: #999;
          padding: 5px;
          width: 200px;
          height: 150px;
          margin-top: 10px;
          line-height: 150px;
          color: white;
          text-align: center;
          word-break: break-all;
      }

      body #profile-list p {
          margin: 0;
      }

      * {
          box-sizing: border-box;
      }

      body #profile-list {
          display: flex;
          flex-flow: row wrap;
          align-item: flex-end;
          justify-content: space-around;
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
        console.error('oops');
        console.error(error, error.stack || error.message);
      });

    return false;
  });
});
