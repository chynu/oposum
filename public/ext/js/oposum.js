/**
 * 
 * Oposum - Video tutorial summary app.
 * 
 * When a youtube video page is loaded, oposum.js sends a message
 * of the currently open URL.
 */

chrome.runtime.sendMessage({method: "getLocalStorage", key: "status"}, function(response) {
  console.log(response.data);
});
