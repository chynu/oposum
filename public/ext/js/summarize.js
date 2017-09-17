/**
 * 
 * Oposum - Video tutorial summary app.
 * 
 * Run when the popup is loaded (when the extension button is clicked).
 * Gets the url of the currently open page and get summary of it using
 * AJAX post and displays into the extension window.
 */

// When clicking the button to go to saved summaries.
$('#saved').click(function() {
    var newURL = "https://google.com/";
    chrome.tabs.create({ 
      url: 'http://google.com' 
    }, function(){});
});
