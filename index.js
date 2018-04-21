// ==UserScript==
// @name         mes
// @namespace    https://github.com/abrkn/mes#readme
// @version      0.3.9
// @description  Memo Enhancement Suite (MES)
// @author       Andreas Brekken: https://memo.cash/profile/149o1esm1LrYEy1DizZgxANSppx3FESHKw
// @match        https://memo.cash/*
// @grant        GM_xmlhttpRequest
// ==/UserScript==
(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
module.exports = "/* Globals */\n* {\n  box-sizing: border-box;\n}\nhtml body .btn-leave {\n  background: #b5b5b5;\n}\nhtml body .btn-leave:hover,\nhtml body .btn-leave:focus {\n  background: #999;\n}\nbody .btn:hover,\n.btn:focus {\n  background: #bfe498;\n}\nbody table {\n  margin: 65px auto 0;\n}\nbody table.table td {\n  border-radius: 0px;\n  margin: 5px;\n  padding: 20px;\n}\nhtml hr {\n  border: 1px solid #eee;\n}\nbody table.table th {\n  border-radius: 0;\n}\nbody ul {\n  margin: 0;\n}\nbody ul li {\n  display: inline-block;\n  list-style: none;\n  margin: 5px;\n}\nbody .btn,\n.btn-primary.btn-block,\nbody input[type=submit].btn {\n  background: #99c261;\n  border: 0;\n  border-radius: 50px;\n  color: #fff;\n  margin: 5px 0;\n  padding: 8px 12px;\n  transition: background-color 0.25s ease;\n}\n/* Actions */\n.is-disabled,\n.post.is-liking .actions .like-button,\n.post.is-liked .actions .like-button {\n  cursor: not-allowed;\n  pointer-events: none;\n}\n.post .actions .like-button:after {\n  content: \"Like Memo\";\n}\n.post.is-liked .actions .like-button {\n  background-color: rgba(0,0,0,0.2);\n}\n.post.is-liked .actions .like-button:after {\n  content: \"👍 Liked Memo!\";\n}\n.post.is-liking .actions .like-button {\n  background-color: rgba(84,141,29,0.75);\n}\n.post.is-liking .actions .like-button:after {\n  content: \"⌛ Liking Memo...\";\n}\n/* Inputs */\nbody #profile-search {\n  background: #eee;\n  border: 0;\n  border-radius: 0;\n  font-size: 20px;\n  height: 45px;\n  margin: 5px auto 0;\n  max-width: 100%;\n  padding: 5px 10px;\n  text-align: center;\n  width: 600px;\n}\nbody label[for=profile-search] {\n  display: block;\n  margin: 0;\n}\nbody textarea,\ninput[type=text],\ninput[type=password] {\n  background: #eee;\n  border: 0;\n  border-radius: 0;\n  padding: 5px 10px;\n  font-size: 19px;\n  line-height: 1.4;\n}\nbody input[type=text],\nbody input[type=password] {\n  background: #eee;\n  border: 0;\n  border-radius: 0;\n  height: 35px;\n}\nbody #form-signup {\n  padding: 10px 0;\n}\n/* Navigation */\nbody > div.header > div > a:nth-child(4) {\n  background: none;\n  color: #618b32;\n  position: absolute;\n  right: 95px;\n  top: 0;\n}\nbody > div.header > div > a:nth-child(4):hover,\nbody > div.header > div > a:nth-child(5):hover {\n  color: #222;\n}\nbody > div.header > div > a:nth-child(5) {\n  background: none;\n  color: #618b32;\n  position: absolute;\n  right: 0;\n  top: 0;\n}\nhtml a[href=\"logout\"] {\n  position: absolute;\n  top: 2px;\n  background: #b5b5b5;\n  left: 5px;\n  position: absolute;\n}\n/* Post and Profile */\nbody #profile-list {\n  align-item: flex-end;\n  display: flex;\n  flex-flow: row wrap;\n  justify-content: space-around;\n}\nbody #profile-list .btn {\n  background: #c2c2c2;\n  border-radius: 3px;\n  color: white;\n  height: 150px;\n  line-height: 150px;\n  margin: 2px;\n  padding: 5px;\n  text-align: center;\n  width: 211px;\n  word-break: break-all;\n}\nbody #profile-list .btn:hover,\nbody #profile-list .btn:focus {\n  background: #777;\n}\nbody #profile-list p {\n  margin: 0;\n}\nbody .header h1 {\n  display: block;\n  margin: 15px 0;\n  text-align: center;\n}\nbody .header,\nbody {\n  text-align: center;\n}\nbody .message {\n  font-family: helvetica, arial, sans-serif;\n  font-size: 21px;\n  line-height: 1.3;\n  padding: 5px 10px;\n}\nhtml .post {\n  margin: 20px auto;\n  box-shadow: none;\n  border: 1px solid #ddd;\n  background: #eee;\n  border-radius: 4px;\n  max-width: 888px;\n  text-align: left;\n  margin: 25px auto;\n}\nbody .post .btn-leave {\n  float: right;\n}\nbody .post .actions {\n  margin: 10px;\n}\nbody .post .likes {\n  margin: 10px;\n}\nbody .message a {\n  color: #a1c16d;\n}\nbody .post {\n  padding: 0;\n}\nbody .post .name {\n  background: #fff;\n  border-radius: 5px 5px 0 0;\n  margin: 0;\n  padding: 10px;\n  color: #222;\n}\nbody > p:nth-child(9) > a.btn:nth-child(2) {\n  display: block;\n  width: 400px;\n  margin: 10px auto;\n  background: #618b32;\n  position: absolute;\n  top: 175px;\n  left: 50%;\n  margin-left: -200px;\n}\nbody > p:nth-child(9) > a.btn:nth-child(1) {\n  display: block;\n  width: 400px;\n  margin: 10px auto;\n  background: #888;\n}\nhtml a[href=\"key/change-password\"],\nhtml a[href=\"key/export\"],\nhtml a[href=\"memo/set-name\"] {\n  background: #fff;\n  border: 1px solid #888;\n  color: #888;\n}\nhtml a[href=\"key/change-password\"]:hover,\nhtml a[href=\"key/export\"]:hover,\nhtml a[href=\"memo/set-name\"]:hover,\nhtml a[href=\"key/change-password\"]:focus,\nhtml a[href=\"key/export\"]:focus,\nhtml a[href=\"memo/set-name\"]:focus {\n  background: #fff;\n  border-color: #999;\n  color: #999;\n}\n/* Footer */\nhtml a[href=\"/introducing-memo\"],\nhtml a[href=\"/profile/1F5GrRezwGokQhxmF4fYaBbbNrPPaeBqMm\"],\nhtml a[href=\"/stats\"] {\n  background: #ccc;\n}\n/* \"Like Memo\" button texts */\n";
},{}],2:[function(require,module,exports){
const { fetchTmXhr, fetchCsrf } = require("./memoFetch");
const injectInlineCommenting = require("./plugins/inline-commenting");
const { state, saveState } = require("./state");
const injectRememberPassword = require("./plugins/remember-password");
const injectAutoExpandImages = require("./plugins/auto-expand-images");

const addCss = () => {
  const element = document.createElement("style");
  element.innerText = require("../app.css");

  document.head.appendChild(element);
};

addCss();

$(() => {
  injectRememberPassword();

  const $formMemoLike = $("#form-memo-like");

  if ($formMemoLike.length) {
    // Only tip in integers with a minimum of what is stated: "(min. 123)"
    $formMemoLike.find("input#tip").attr({
      type: "number",
      pattern: "d*",
      min: $('#form-memo-like label[for="tip"]')
        .text()
        .match(/(\d+)\)/)[1]
    });
  }

  injectAutoExpandImages();

  // Add missing css class to "Like Memo" buttons
  $(`.post .actions a[href^='memo/like']`).addClass("like-button");

  // Add data-txhash to posts
  $(`.post .actions .like-button`).each((_, a) => {
    const $a = $(a);
    const $post = $a.closest(".post");
    const href = $a.attr("href");
    const txhash = href.match(/[^\/\?]+$/)[0];
    $post.attr("data-txhash", txhash);
  });

  // Remove "Like Memo", which will be done by CSS instead
  $(`.post .actions .like-button`).html("");

  // Restore likes
  $(".post[data-txhash]").each((_, post) => {
    const $post = $(post);
    const txhash = $post.attr("data-txhash");

    $post.toggleClass("is-liked", !!state.likedPosts[txhash]);
  });

  injectInlineCommenting();
});

},{"../app.css":1,"./memoFetch":4,"./plugins/auto-expand-images":5,"./plugins/inline-commenting":6,"./plugins/remember-password":7,"./state":8}],3:[function(require,module,exports){
const { state, saveState } = require("./state");
const { fetchCsrf, fetchTmXhr } = require("./memoFetch");

const likePostInBackground = async (txhash, tip = 0) => {
  const { memoPassword: password } = localStorage;
  const csrf = await fetchCsrf(`memo/like/${txhash}`);
  const tipForQuery = (+tip || "").toString();

  await fetchTmXhr({
    url: "memo/like-submit",
    data: `txHash=${txhash}&tip=${tipForQuery}&password=${password}`,
    csrf
  });

  const prevTip = state.likedPosts[txhash] ? state.likedPosts[txhash].tip || 0 : 0;

  state.likedPosts[txhash] = {
    timestamp: +new Date(),
    tip: prevTip + +tip
  };

  saveState();
};

Object.assign(exports, {
  likePostInBackground
});

},{"./memoFetch":4,"./state":8}],4:[function(require,module,exports){
const fetchTmXhr = req =>
  new Promise((resolve, reject) => {
    if (!req.url.match(/^http/)) {
      req.url = `https://memo.cash/${req.url}`;
    }
    console.log(`Fetching ${req.url} to get CSRF...`);

    const onerror = error => reject(error);

    const onload = res => {
      const { readyState, responseText, status } = res;

      if (res.readyState !== 4) {
        reject(new Error(`readyState=${readyState}; responseText: ${responseText || "<none>"}`));
        return;
      }
      if (!(status >= 200 && status < 300)) {
        reject(new Error(`HTTP Status=${status || "<none>"}; responseText: ${responseText || "<none>"}`));
        return;
      }
      console.log(`Fetched ${req.url}`);

      resolve(responseText);
    };

    const contentType = "application/x-www-form-urlencoded; charset=UTF-8";

    const reqToSend = Object.assign(
      {
        method: req.data ? "POST" : "GET",
        headers: {
          ...(req.csrf ? { "x-csrf-token": `${req.csrf}` } : {}),
          ...(req.data ? { referer: req.url } : {}),
          "content-type": contentType
        },
        onerror,
        onload
      },
      req
    );

    GM_xmlhttpRequest(reqToSend);
  });

const fetchCsrf = url => fetchTmXhr({ url }).then(text => text.match(/MemoApp.InitCsrf."([^"]+)/)[1]);

Object.assign(exports, {
  fetchTmXhr,
  fetchCsrf
});

},{}],5:[function(require,module,exports){
function injectAutoExpandImages() {
  $(".post .message").each((_, message) => {
    const $message = $(message);
    const messageWidth = $message.width();
    const $a = $message.find("a");

    const $aToImg = $a.filter((_, a) =>
      $(a)
        .attr("href")
        .match(/\.(png|jpe?g|gif)$/i)
    );
    $aToImg.each((_, a) => $(a).html(`<img src="${$a.attr("href")}" style="max-width:${messageWidth - 20}px;max-height:200px;display:block;margin:10px auto;" />`));
  });
}

module.exports = injectAutoExpandImages;

},{}],6:[function(require,module,exports){
const { likePostInBackground } = require("../memoApi");

function injectInlineCommenting() {
  $(`.post .actions .like-button`).click(e => {
    const $a = $(e.target);
    const $post = $a.closest(".post");
    const href = $a.attr("href");
    const txhash = href.match(/[^\/\?]+$/)[0]; // TODO: Duplicate
    const { memoPassword: password } = localStorage;

    const tipText = prompt("How much tip in satoshis? (Blank=0)", "0");

    if (tipText === null) {
      return false;
    }
    $post.addClass("is-liking");

    likePostInBackground(txhash, tipText)
      .then(() => {
        $post.removeClass("is-liking");
        $post.addClass("is-liked");
      })
      .catch(error => {
        $post.removeClass("is-liking");
        alert(`Failed to like: ${error.message || error.stack || error}!`);
      });

    return false;
  });
}

module.exports = injectInlineCommenting;

},{"../memoApi":3}],7:[function(require,module,exports){
function injectRememberPassword() {
  $('[type="password"]').each((_, password) => {
    // Load
    $(password).val(localStorage.memoPassword || "");

    // Save
    $(password)
      .closest("form")
      .submit(() => {
        localStorage.memoPassword = $(password).val();
      });
  });
}

module.exports = injectRememberPassword;

},{}],8:[function(require,module,exports){
const MES_STORAGE_KEY = "mes-7932a97f";

const state = JSON.parse(localStorage[MES_STORAGE_KEY] || "{}");

Object.assign(state, {
  likedPosts: state.likedPosts || {}
});

console.log({ state });

const saveState = () => {
  localStorage[MES_STORAGE_KEY] = JSON.stringify(state, null, 2);
};

Object.assign(exports, {
  state,
  saveState
});

},{}]},{},[2]);
