// let savedSummaries = JSON.parse(localStorage.getItem('savedSummaries'));
// let list = document.getElementById('summary-list');
// if (savedSummaries !== null && savedSummaries.length !== 0) {
//   for (summary of savedSummaries) {
//     let listItem = document.createElement('li');
//     let h2 = document.createElement('h2');
//     let h2Text = document.createTextNode(summary.title);
//     h2.appendChild(h2Text);
//     let paragraph = document.createElement('p');
//     let paragraphText = document.createTextNode(summary.content);
//     paragraph.appendChild(paragraphText);
//     listItem.appendChild(h2);
//     listItem.appendChild(paragraph);
//     list.prepend(listItem);
//   }
// }
// else {
//   let listItem = document.createElement('li');
//   let h2 = document.createElement('h2');
//   let h2Text = document.createTextNode('No Summaries Found');
//   h2.appendChild(h2Text);
//   listItem.appendChild(h2);
//   list.appendChild(listItem);
// }
let savedSummaries = JSON.parse(localStorage.getItem('savedSummaries'));
let main = document.getElementById('some-id');
let urlBar = document.location.href.split('/');
let videoId = urlBar[urlBar.length - 2];
console.log(videoId);
fetch("/" + videoId, {
  method: "POST"
}).then((response) => {
  return response.text();
}).then((response) => {
  fetch("https://www.youtube.com/watch?v=" + videoId, {
    method: "GET",
    mode: 'no-cors'
  }).then((response2) => {
    return "video title"
  }).then((response2) => {
    createCard(response2, response);
  });
});

let createCard = (title, content) => {
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