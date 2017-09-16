let savedSummaries = JSON.parse(localStorage.getItem('savedSummaries'));
let list = document.getElementById('summary-list');
if (savedSummaries !== null && savedSummaries.length !== 0) {
  for (summary of savedSummaries) {
    let listItem = document.createElement('li');
    let h2 = document.createElement('h2');
    let h2Text = document.createTextNode(summary.title);
    h2.appendChild(h2Text);
    let paragraph = document.createElement('p');
    let paragraphText = document.createTextNode(summary.content);
    paragraph.appendChild(paragraphText);
    listItem.appendChild(h2);
    listItem.appendChild(paragraph);
    list.prepend(listItem);
  }
}
else {
  let listItem = document.createElement('li');
  let h2 = document.createElement('h2');
  let h2Text = document.createTextNode('No Summaries Found');
  h2.appendChild(h2Text);
  listItem.appendChild(h2);
  list.appendChild(listItem);
}