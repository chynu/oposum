// Whether the video has been clicked?
var opossum_clicked = false; // TODO: Show as already saved after checking db
// TODO: Catch for when there are second specifications afterwards.
console.log(chrome);
chrome.tabs.getCurrent(function(tab){
  console.log(tab);
  var currentTab = (tab.href);
});
var split_url = currentTab.split('/watch?v=');

if (split_url.length != 1) {
  var video_id = split_url[1];
  window.alert(video_id);
} else {
  window.alert('hello');
}

/**
 * Gets summary of currently playing video.
 */
function getSummary() {
  console.log('Retrieving summary...');
  var oSummary = '';
  $.ajax({
    method: 'POST',
    url: 'http://edusearch-eleng555.c9users.io/' + video_id,
    dataType: 'text',
    success: function(data) {
      console.log('Summary retrieved!');
      oSummary = data;
    }
  });
  return oSummary || "Hello. Here is some sample text.";
}
