// ==UserScript==
// @name         YouTube Remove playlist parameters
// @namespace    https://github.com/azucat2
// @version      1.0.0
// @description  Remove the playlist parameters from the YouTube url.
// @author       azucat2
// @match        https://www.youtube.com/watch*
// @run-at       document-start
// @grant        none
// @license      MIT
// ==/UserScript==

(function(){
    var url = document.URL;
    if (url.indexOf("about:blank") == -1) {
        if(url.match(/\?v=.{11}&list=PL.{32}&index=[0-9]*/)) {
            location.href = url.replace(/&list=PL.{32}&index=[0-9]*/, "");
        }
    }
})();