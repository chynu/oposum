setTimeout(loadButton, 2000);

var opossum_clicked = false;
var video_id = window.location.href.split('/watch?v=')[1];

/**
 * Loads the button onto the page.
 */
function loadButton() {
  var menuContainer = document.getElementById('menu-container');
  var header = document.getElementsByTagName('ytd-video-primary-info-renderer')[0];

  if (!header) {
    console.warn('No header text detected.');
    return;
  }

  var button = document.createElement('button');
  button.textContent = 'COOL BUTTON';
  button.setAttribute('id', 'opossum');

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
  // TODO: Get summary of video currently playing.
  var oSummary = data;
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
