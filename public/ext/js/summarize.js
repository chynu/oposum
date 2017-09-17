/**
 * 
 * Oposum - Video tutorial summary app.
 * 
 * Run when the popup is loaded (when the extension button is clicked).
 * Gets the url of the currently open page and get summary of it using
 * AJAX post and displays into the extension window.
 */

function open(name) {
  var url_ = '';
  if (name == 'saved') {
    url_ = '../../public/web/index.html';
  } else if (name == 'site') {
    url_ = 'https://oposum.herokuapp.com';
  } else if (name == 'git') {
    url_ = 'https://github.com/chynu/edusearch';
  }
  console.log(chrome);
  chrome.tabs.create({ 
    url: url_
  }, function(){});
}

$(document).ready(function() {
  $('#saved').click(function() {
    open('saved');
  });
  $('#git').click(function() {
    open('git');
  })
  $('#web').click(function() {
    open('site');
  })
});
