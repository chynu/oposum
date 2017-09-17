/**
 * 
 * Oposum - Video tutorial summary app.
 * 
 * Background.js is always running in the background.
 */

var tabURL = ""; 
chrome.runtime.onMessage.addListener(
function(message, sender, sendResponse) {
  chrome.tabs.query({
      active: true, currentWindow: true
    }, function(arrayOfTabs) {
      var activeTab = arrayOfTabs[0];
      tabURL = activeTab.url;
  });
});
