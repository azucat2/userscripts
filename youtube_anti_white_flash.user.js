// ==UserScript==
// @name         YouTube Anti-White-Flash
// @namespace    https://github.com/azucat2
// @version      1.0.0
// @updateURL    https://github.com/azucat2/userscripts/raw/main/youtube_anti_white_flash.user.js
// @downloadURL  https://github.com/azucat2/userscripts/raw/main/youtube_anti_white_flash.user.js
// @description  Anti-White-Flash on YouTube.
// @author       azucat2
// @match        https://www.youtube.com/*
// @run-at       document-start
// @grant        none
// @license      MIT
// ==/UserScript==

(function () {
  const style = document.createElement("style");
  style.textContent = `
    html, body, ytd-app {
      background-color: #0f0f0f !important;
    }
  `;
  document.documentElement.appendChild(style);
})();
