function get() {
  // Read it using the storage API
  var savedSummaries = [];
  chrome.storage.sync.get(['summaries'], function(items) {
    savedSummaries = items.summaries;
    console.log('sUMMARIES');
    console.log(savedSummaries);
    let main = document.getElementById('some-id');
    if (savedSummaries !== null && savedSummaries.length !== 0) {
      for (summary of savedSummaries) {
        let card = createCard(summary.title, summary.content);
        main.prepend(card);
      }
    } else {
      let card = createCard('No summaries found', '');
      main.prepend(card);
    }

    function createCard(title, content) {
      let section = document.createElement('section');
      section.className = 'section--center mdl-grid mdl-grid--no-spacing mdl-shadow--2dp';
      let divShape = document.createElement('div');
      divShape.className = 'mdl-card mdl-cell mdl-cell--12-col';
      let divContent = document.createElement('div');
      divContent.className = 'mdl-card__supporting-text';
      let h4 = document.createElement('h4');
      let h4Text = document.createTextNode(title);
      let p = document.createElement('p');
      let pText = document.createTextNode(content);
      p.appendChild(pText);
      h4.appendChild(h4Text);
      section.appendChild(divShape);
      divShape.appendChild(divContent);
      divContent.appendChild(h4);
      divContent.appendChild(p);
      return section;
    }
  });
  return savedSummaries;
}

get();
