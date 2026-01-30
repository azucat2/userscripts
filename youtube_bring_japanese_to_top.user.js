// ==UserScript==
// @name         YouTube Bring Japanese to Top
// @namespace    https://github.com/azucat2/
// @version      1.0
// @updateURL    https://github.com/azucat2/userscripts/raw/main/youtube_bring_japanese_to_top.user.js
// @downloadURL  https://github.com/azucat2/userscripts/raw/main/youtube_bring_japanese_to_top.user.js
// @description  Bring the "Japanese" option to the top of the Translation menu on YouTube.
// @description:ja YouTubeの翻訳メニューで「日本語」オプションを一番上に移動します。
// @author       azucat2
// @match        https://www.youtube.com/watch*
// @grant        none
// @license      MIT
// ==/UserScript==

(function () {
  "use strict";

  const sortTranslationLanguages = (data) => {
    const langs =
      data?.captions?.playerCaptionsTracklistRenderer?.translationLanguages;
    if (Array.isArray(langs)) {
      const jaIndex = langs.findIndex((l) => l.languageCode === "ja");
      if (jaIndex > 0) {
        const [jaItem] = langs.splice(jaIndex, 1);
        langs.unshift(jaItem);
      }
    }
    return data;
  };

  let playerResponse = window.ytInitialPlayerResponse;

  Object.defineProperty(window, "ytInitialPlayerResponse", {
    get() {
      return playerResponse;
    },
    set(newValue) {
      playerResponse = sortTranslationLanguages(newValue);
    },
    configurable: true,
    enumerable: true,
  });

  if (playerResponse) {
    sortTranslationLanguages(playerResponse);
  }
})();
