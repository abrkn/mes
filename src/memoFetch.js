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
        reject(new Error(`readyState=${readyState}; responseText: ${responseText || '<none>'}`));
        return;
      }
      if (!(status >= 200 && status < 300)) {
        reject(
          new Error(`HTTP Status=${status || '<none>'}; responseText: ${responseText || '<none>'}`)
        );
        return;
      }
      console.log(`Fetched ${req.url}`);

      resolve(responseText);
    };

    const contentType = 'application/x-www-form-urlencoded; charset=UTF-8';

    const reqToSend = Object.assign(
      {
        method: req.data ? 'POST' : 'GET',
        headers: {
          ...(req.csrf ? { 'x-csrf-token': `${req.csrf}` } : {}),
          ...(req.data ? { referer: req.url } : {}),
          'content-type': contentType,
        },
        onerror,
        onload,
      },
      req
    );

    GM_xmlhttpRequest(reqToSend);
  });

const fetchCsrf = url =>
  fetchTmXhr({ url }).then(text => text.match(/MemoApp.InitCsrf."([^"]+)/)[1]);

Object.assign(exports, {
  fetchTmXhr,
  fetchCsrf,
});
