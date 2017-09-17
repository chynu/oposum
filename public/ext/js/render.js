// Waits for page to load. Temporary hack bc YT uses
// asynchronous loading and idk how to do this lol
setTimeout(loadButton, 2000);

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
 * Injects summary text into view.
 */
function injectText(htmlText) {
  if (htmlText) {
    htmlText += '<br><hr><br><br>';
  }
  $('#opossum_text').html(htmlText);
}
