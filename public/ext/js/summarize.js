/**
 * 
 * Oposum - Video tutorial summary app.
 * 
 * Run when the popup is loaded (when the extension button is clicked).
 * Gets the url of the currently open page and get summary of it using
 * AJAX post and displays into the extension window.
 */

// Gets URL of currently open tab.
// window.onload = function(){
//   chrome.runtime.getBackgroundPage(function(backgroundPage){ 
//     var currentUrl = backgroundPage.tabURL;
//     var id = getId(currentUrl);
//     console.log('Current URL: ' + currentUrl);

//     // TODO: Replace video ID with the ID of the current video.
//     getSummary(id, function(data) {
//       console.log('Here is the summary.');
//       var sum = data || 'Sample text.';
//       $('#summary').html(data);
//     });
//   });
// };

/**
 * Gets summary of currently playing video.
 */
// function getSummary(video_id, grabText) {
//   console.log('Retrieving summary...');
//   $.ajax({
//     method: 'POST',
//     url: 'https://edusearch-eleng555.c9users.io/' + video_id,
//     dataType: 'text',
//     success: function(data) {
//       console.log('Summary retrieved!');
//       grabText(data);
//     }
//   });
// }
