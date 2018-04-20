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

/* Globals */

* {
    box-sizing: border-box;
}

html body .btn-leave {
    background: #b5b5b5;
}

html body .btn-leave:hover, html body .btn-leave:focus {
    background: #999;
}

body .btn:hover, .btn:focus {
    background: #bfe498;
}

body table {
    margin: 65px auto 0;
}

body table.table td {
    border-radius: 0px;
    margin: 5px;
    padding: 20px;
}

html hr {
border:1px solid #eee;
}
body table.table th {
    border-radius: 0;
}

body ul {
    margin: 0;
}

body ul li {
    display: inline-block;
    list-style: none;
    margin: 5px;
}


body .btn, .btn-primary.btn-block, body input[type=submit].btn {
    background: #99c261;
    border: 0;
    border-radius: 50px;
    color: #fff;
    margin: 5px 0;
    padding: 8px 12px;
    transition: background-color 0.25s ease;
}

/* Actions */

.is-disabled, .post.is-liking .actions .like-button, .post.is-liked .actions .like-button {
    cursor: not-allowed;
    pointer-events: none;
}

.post .actions .like-button:after {
    content: "Like Memo";
}

.post.is-liked .actions .like-button {
    background-color: rgba(0,0,0,0.2);
}

.post.is-liked .actions .like-button:after {
    content: "${THUMBS_UP} Liked Memo!";
}

.post.is-liking .actions .like-button {
    background-color: rgba(84,141,29,0.75);
}

.post.is-liking .actions .like-button:after {
    content: "${HOURGLASS} Liking Memo...";
}

/* Inputs */

body #profile-search {
    background: #eee;
    border: 0;
    border-radius: 0;
    font-size: 20px;
    height: 45px;
    margin: 5px auto 0;
    max-width: 100%;
    padding: 5px 10px;
    text-align: center;
    width: 600px;
}

body label[for=profile-search] {
    display: block;
    margin: 0;
}

body textarea, input[type=text], input[type=password] {
    background: #eee;
    border: 0;
    border-radius: 0;
    padding: 5px 10px;
    font-size: 19px;
    line-height: 1.4;
}

body input[type=text], body input[type=password] {
    background: #eee;
    border: 0;
    border-radius: 0;
    height: 35px;
}

body #form-signup {
    padding: 10px 0;
}

/* Navigation */

body > div.header > div > a:nth-child(4) {
    background: none;
    color: #618b32;
    position: absolute;
    right: 95px;
    top: 0;
}

body > div.header > div > a:nth-child(4):hover, body > div.header > div > a:nth-child(5):hover {
    color: #222;
}

body > div.header > div > a:nth-child(5) {
    background: none;
    color: #618b32;
    position: absolute;
    right: 0;
    top: 0;
}

html a[href="logout"] {
  position:absolute;
  top:2px;
  background:#b5b5b5;
  left:5px;
  position:absolute;
}

/* Post and Profile */


body #profile-list {
    align-item: flex-end;
    display: flex;
    flex-flow: row wrap;
    justify-content: space-around;
}

body #profile-list .btn {
    background: #c2c2c2;
    border-radius: 3px;
    color: white;
    height: 150px;
    line-height: 150px;
    margin: 2px;
    padding: 5px;
    text-align: center;
    width: 211px;
    word-break: break-all;
}

body #profile-list .btn:hover, body #profile-list .btn:focus {
    background: #777;
}

body #profile-list p {
    margin: 0;
}
      
body .header h1 {
    display: block;
    margin: 15px 0;
    text-align: center;
}

body .header, body {
    text-align: center;
}
      
body .message {
    font-family: helvetica, arial, sans-serif;
    font-size: 21px;
    line-height: 1.3;
    padding: 5px 10px;
}

html .post {
    margin: 20px auto ;
    box-shadow: none;
    border: 1px solid #ddd;
    background: #eee;
    border-radius:5px;
}

body .message a {
    color: #a1c16d;
}

body .post {
    padding: 0;
}

body .post .name {
    background: #fff;
    border-radius: 5px 5px 0 0;
    margin: 0;
    padding: 10px;
    color: #222
      ;
}
      
body > p:nth-child(9) > a.btn:nth-child(2) {
    display: block;
    width: 400px;
    margin: 10px auto;
    background: #618b32;
    position:absolute;
    top:175px;
    left:50%;
    margin-left:-200px;
}

body > p:nth-child(9) > a.btn:nth-child(1) {
    display: block;
    width: 400px;
    margin: 10px auto;
    background: #888;
}

html a[href="key/change-password"], html a[href="key/export"], html a[href="memo/set-name"] {
  background:#fff;
  border:1px solid #888;
  color:#888;
}

html a[href="key/change-password"]:hover, html a[href="key/export"]:hover, html a[href="memo/set-name"]:hover, html a[href="key/change-password"]:focus, html a[href="key/export"]:focus, html a[href="memo/set-name"]:focus {
  background:#fff;
  border-color:#999;
  color:#999;
}

/* Footer */

html a[href="/introducing-memo"], html a[href="/profile/1F5GrRezwGokQhxmF4fYaBbbNrPPaeBqMm"], html a[href="/stats"] {
  background:#ccc;
}

  /* "Like Memo" button texts */

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
          20}px;max-height:200px;display:block;margin:10px auto;" />`
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