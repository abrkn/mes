const { state, saveState } = require('./state');
const { fetchCsrf, fetchTmXhr } = require('./memoFetch');

const likePostInBackground = async (txhash, tip = 0) => {
  const { memoPassword: password } = localStorage;
  const csrf = await fetchCsrf(`memo/like/${txhash}`);
  const tipForQuery = (+tip || '').toString();

  await fetchTmXhr({
    url: 'memo/like-submit',
    data: `txHash=${txhash}&tip=${tipForQuery}&password=${password}`,
    csrf,
  });

  const prevTip = state.likedPosts[txhash] ? state.likedPosts[txhash].tip || 0 : 0;

  state.likedPosts[txhash] = {
    timestamp: +new Date(),
    tip: prevTip + +tip,
  };

  saveState();
};

const replyToPostInBackground = async (txhash, message) => {
  const { memoPassword: password } = localStorage;
  const csrf = await fetchCsrf(`memo/like/${txhash}`);

  await fetchTmXhr({
    url: 'memo/reply-submit',
    data: `txHash=${txhash}&message=${message}&password=${password}`,
    csrf,
  });

  state.myReplies.push({
    parentTxhash: txhash,
    timestamp: +new Date(),
  });

  saveState();
};

Object.assign(exports, {
  likePostInBackground,
  replyToPostInBackground,
});
