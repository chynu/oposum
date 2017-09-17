// Waits for page to load. Temporary hack bc YT uses
// asynchronous loading and idk how to do this lol
setTimeout(loadButton, 2000);

// Whether the video has been clicked?
var opossum_clicked = false; // TODO: Show as already saved after checking db
var video_id = window.location.href.split('/watch?v=')[1];

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
  button.setAttribute('id', 'opossum');

  console.log('Loading button...');
  header.insertBefore(button, header.children[0]);
  $('#meta-contents').append('<div id="opossum_text"></div>');

  $('#opossum').click(function() {
    opossum_clicked = !opossum_clicked;

    if (opossum_clicked) {
      injectText(getSummary());
    } else {
      injectText("");
    }
  });
};

/**
 * Gets summary of currently playing video.
 */
function getSummary() {
  console.log('Retrieving summary...');
  var oSummary = '';
  $.ajax({
    method: 'POST',
    url: '/' + video_id,
    data: video_id,
    dataType: 'text',
    success: function(data) {
      console.log('Summary retrieved!');
      oSummary = data;
    }
  });
  return oSummary || "Hello. Here is some sample text.";
}

/**
 * Injects summary text into view.
 */
function injectText(htmlText) {
  if (htmlText) {
    htmlText += '<br><hr><br><br>';
  }
  $('#opossum_text').html(htmlText);
}
