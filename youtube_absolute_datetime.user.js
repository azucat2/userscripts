// ==UserScript==
// @name           YouTube Absolute DateTime
// @namespace      https://github.com/azucat2/
// @version        1.2.0
// @updateURL      https://github.com/azucat2/userscripts/raw/main/youtube_absolute_datetime.user.js
// @downloadURL    https://github.com/azucat2/userscripts/raw/main/youtube_absolute_datetime.user.js
// @description    Display the absolute date and time when the stream started
// @description:ja 配信開始日時を表示します
// @author         azucat2
// @match          https://www.youtube.com/watch*
// @grant          none
// @license        MIT
// ==/UserScript==

(() => {
  "use strict";

  let timerId = null;

  const main = () => {
    const playerResponse =
      document.querySelector("ytd-watch-flexy")?.playerResponse ||
      window.ytInitialPlayerResponse;
    const micro = playerResponse?.microformat?.playerMicroformatRenderer;
    const startDateText =
      micro?.liveBroadcastDetails?.startTimestamp ||
      micro?.publishDate ||
      micro?.uploadDate;

    if (!startDateText) return;

    const startDate = new Date(startDateText);
    const absoluteStr = startDate.toLocaleString();
    const dateElement = document.querySelector("#info > span:nth-child(3)");

    if (!dateElement) return;

    if (dateElement.innerText.includes(absoluteStr)) return;

    let repDate = dateElement.innerText;

    if (document.documentElement.lang.startsWith("ja")) {
      const minRegex = /(^[0-9]+ (分|時間|週間|日|か月|年)前)(.*)/i;
      repDate = repDate.replace(minRegex, (match, p1, p2, p3) => {
        return [p1, p3].join("(" + absoluteStr + ")");
      });
    } else if (document.documentElement.lang.startsWith("en")) {
      const minRegex =
        /(^.*([0-9]+ (minute|hour|day|week|month|year)(s|) ago)(.*))/i;
      repDate = repDate.replace(minRegex, (match, p1, p2, p3, p4, p5) => {
        return [p1, p5].join("(" + absoluteStr + ")");
      });
    }
    dateElement.innerText = repDate;
  };

  const scheduleMain = (delay) => {
    if (timerId) {
      clearTimeout(timerId);
    }
    timerId = setTimeout(main, delay);
  };

  document.addEventListener("yt-navigate-finish", () => {
    scheduleMain(1000);
  });

  if (document.readyState === "complete") {
    scheduleMain(1000);
  } else {
    window.addEventListener("load", () => {
      scheduleMain(1000);
    });
  }
})();
