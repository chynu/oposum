/**
 * 
 * Oposum - Video tutorial summary app.
 * 
 * Run when the popup is loaded (when the extension button is clicked).
 * Gets the url of the currently open page and get summary of it using
 * AJAX post and displays into the extension window.
 */

// console.log(chrome);
// chrome.tabs.getCurrent(function(tab){
//   console.log(tab);
//   var currentTab = (tab.href);
// });
// var split_url = currentTab.split('/watch?v=');

// if (split_url.length != 1) {
//   var video_id = split_url[1];
//   window.alert(video_id);
// } else {
//   window.alert('hello');
// }

// Gets URL of currently open tab.
window.onload = function(){
  chrome.runtime.getBackgroundPage(function(backgroundPage){ 
    var currentUrl = backgroundPage.tabURL;
    var id = getId(currentUrl);
    console.log('Current URL: ' + currentUrl);

    // TODO: Replace video ID with the ID of the current video.
    getSummary(id, function(data) {
      console.log('Here is the summary.');
      var sum = data || 'Sample text.';
      $('#summary').html(data);
    });
  });
};

/**
 * Given a youtube URL, gets the id of the video. If it is
 * not a valid youtube video, returns null.
 */
function getId(url) {
  var spliced = url.split('/watch?v=');
  if (spliced.length > 1) {
    spliced[1] = spliced[1].replace(/\?t=*/g, '');
    return spliced[1];
  } else {
    return null;
  }
}

/**
 * Gets summary of currently playing video.
 */
function getSummary(video_id, grabText) {
  console.log('Retrieving summary...');
  $.ajax({
    method: 'POST',
    url: 'https://edusearch-eleng555.c9users.io/' + video_id,
    dataType: 'text',
    success: function(data) {
      console.log('Summary retrieved!');
      grabText(data);
    }
  });
}
