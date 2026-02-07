// ==UserScript==
// @name         YouTube Remove playlist parameters
// @namespace    https://github.com/azucat2
// @version      1.1.0
// @updateURL    https://github.com/azucat2/userscripts/raw/main/youtube_remove_playlist_parameter.user.js
// @downloadURL  https://github.com/azucat2/userscripts/raw/main/youtube_remove_playlist_parameter.user.js
// @description  Remove the playlist parameters from the YouTube url.
// @author       azucat2
// @match        https://www.youtube.com/playlist*
// @match        https://www.youtube.com/watch*
// @run-at       document-start
// @grant        none
// @license      MIT
// ==/UserScript==

(function () {
  "use strict";

  function getCleanUrl(url) {
    if (
      typeof url !== "string" ||
      !url.includes("/watch") ||
      !url.includes("list=")
    ) {
      return null;
    }

    try {
      const urlObj = new URL(url, window.location.origin);
      urlObj.searchParams.delete("list");
      urlObj.searchParams.delete("index");
      return urlObj.toString();
    } catch {
      return null;
    }
  }

  window.addEventListener(
    "yt-navigate-start",
    (event) => {
      const detail = event.detail;
      if (!detail) return;

      const originalUrl =
        detail.url || detail.endpoint?.commandMetadata?.webCommandMetadata?.url;
      const cleanUrl = getCleanUrl(originalUrl);

      if (cleanUrl) {
        event.preventDefault();
        event.stopImmediatePropagation();

        const ytdApp = document.querySelector("ytd-app");
        if (ytdApp && typeof ytdApp.navigate === "function") {
          ytdApp.navigate(cleanUrl);
        } else {
          window.location.assign(cleanUrl);
        }
      }
    },
    true,
  );

  const cleanInitial = getCleanUrl(window.location.href);
  if (cleanInitial) {
    window.location.replace(cleanInitial);
  }
})();
