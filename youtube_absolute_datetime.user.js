// ==UserScript==
// @name        YouTube Absolute DateTime
// @namespace   https://github.com/azucat2/
// @match       https://www.youtube.com/watch*
// @grant       none
// @version     1.0.1a
// @author      azucat2
// @description Reveal when broadcast started
// @description:ja その配信がいつ始まったのかを明らかにする
// ==/UserScript==

(() => {
  'use strict';

  const _debug = (...msg) => {
    console.log('[wdbs] ', ...msg);
  };

  const queryString = 'span[itemtype="http://schema.org/BroadcastEvent"] meta[itemprop="startDate"]';

  const main = async () => {
    _debug('start');
    // ページ内遷移した際にヘッダーが変わらないため、自身のページをfetchする
    const res = await fetch(window.location, { cache: 'no-cache' });
    const rawBody = await res.text();
    const domparser = new DOMParser();
    const body = domparser.parseFromString(rawBody, 'text/html');
    const startDateText = body.querySelector(queryString)?.getAttribute('content');
    if (!startDateText) return;

    const startDate = new Date(startDateText);
    _debug(startDate);
    const dateRegex = /^[0-9]{4}\/(0[1-9]|1[0-2])\/(0[1-9]|[12][0-9]|3[01])/i;
    let minRegex;
    const date = document.querySelector('#info > span:nth-child(3)');
    let repDate = date.innerText.replace(dateRegex, startDate.toLocaleString());

    if (document.documentElement.lang === "ja-JP") {
      minRegex = /(^[0-9]+ (分|時間|年)前)(.*)/i;
      function replacer(match, p1, p2, p3, offset, string) {
        return [p1, p3].join("(" + startDate.toLocaleString() + ")");
      }
      repDate = repDate.replace(minRegex, replacer);
    } else if (document.documentElement.lang === "en") {
      minRegex = /(^.*([0-9]+ (minute|hour|year)(s|) ago)(.*))/i;
      function replacer(match, p1, p2, p3, p4, p5, offset, string) {
        return [p1, p5].join("(" + startDate.toLocaleString() + ")");
      }
      repDate = repDate.replace(minRegex, replacer);
    }
    date.innerText = repDate;
  };

  document.addEventListener('yt-navigate-finish', main);
})();