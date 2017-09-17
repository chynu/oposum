/**
 * 
 * Oposum - Video tutorial summary app.
 * 
 * When a youtube video page is loaded, render.js renders the proper UI onto
 * the page to allow users to generate the summary.
 */

// Waits for page to load. Temporary hack bc YT uses
// asynchronous loading and idk how to do this lol
setTimeout(loadButton, 2000);

var style = Object.create(null);
style.body = 'font-size:14px;';
style.h1 = 'font-size:18px;';

var currentTab = window.location.href;
var split_url = currentTab.split('/watch?v=');
var videoId = split_url[1];

// Whether the video has been clicked?
var opossum_clicked = false; // TODO: Show as already saved after checking db
// TODO: Catch for when there are second specifications afterwards.

/**
 * Loads the button onto the page.
 */
function loadButton() {
  console.log('loading button');
  var menuContainer = document.getElementById('menu-container');
  var header = document.getElementsByTagName('ytd-video-primary-info-renderer')[0];

  if (!header) {
    console.warn('No header text detected.');
    return;
  }

  var button = document.createElement('button');
  button.textContent = 'COOL BUTTON';
  button.setAttribute('id', 'opossum_button');

  console.log('Loading button...');
  // Injects the button.
  header.insertBefore(button, header.children[0]);
  // $('.selectable-content.style-scope.paper-menu').append(button);

  // Injects the contents.
  $('#meta-contents').append(
      '<div id="oposum">' +
        '<div id="opossum_text">' +
          '<div style="' + style.h1 + '">Summary</div>' +
          '<p style="' + style.body + '"></p>' +
        '</div>' +
      '</div>');

  $('#opossum_button').click(function() {
    opossum_clicked = !opossum_clicked;

    if (opossum_clicked) {
      getSummary(videoId, function(data) {
        $('#opossum_text p').html(data);
      });
    } else {
      $('#opossum_text p').html('');
    }
  });
};

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
