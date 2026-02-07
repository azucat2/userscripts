// ==UserScript==
// @name         YouTube Auto Show Chat Replay
// @namespace    https://github.com/azucat2
// @version      1.0.0
// @updateURL    https://github.com/azucat2/userscripts/raw/main/youtube_auto_show_chat_replay.user.js
// @downloadURL  https://github.com/azucat2/userscripts/raw/main/youtube_auto_show_chat_replay.user.js
// @description  Auto show chat replay on YouTube.
// @author       azucat2
// @match        https://www.youtube.com/*
// @run-at       document-start
// @grant        none
// @license      MIT
// ==/UserScript==

(function () {
  "use strict";

  function tryShowChat() {
    const chatButton = document.querySelector(
      ".yt-spec-button-shape-next--size-xs",
    );

    if (chatButton) {
      if (chatButton.ariaDisabled === "false") {
        chatButton.click();
      }
      return true;
    }
    return false;
  }

  let chatObserver = null;

  function startChatObservation() {
    if (chatObserver) chatObserver.disconnect();

    if (!window.location.href.includes("/watch")) return;

    const timeout = setTimeout(() => {
      if (chatObserver) chatObserver.disconnect();
    }, 10000);

    chatObserver = new MutationObserver(() => {
      if (tryShowChat()) {
        clearTimeout(timeout);
        chatObserver.disconnect();
      }
    });

    chatObserver.observe(document.body, {
      childList: true,
      subtree: true,
    });
  }

  window.addEventListener("yt-navigate-finish", startChatObservation);

  if (window.location.href.includes("/watch")) {
    window.addEventListener("load", startChatObservation);
  }
})();
