// Reference
var summaries = [
    {
		'title': 'Summary 1',
		'content': 'Content 1'
    },
    {
		'title': 'Summary 2',
		'content': 'Content 2'
    },
    {
		'title': 'Summary 3',
		'content': 'Content 3'
    },
    
];
let summaries = JSON.parse(localStorage.getItem('savedSummaries'));
// add to list
localStorage.setItem('savedSummaries', JSON.stringify(summaries));
// Youtube Data API
// https://www.googleapis.com/youtube/v3/videos?id=' + videoId + '&key=AIzaSyB2Ma4BNgsk8nQYKZap9q77VbNl75l9mF8&fields=items(snippet(title))&part=snippet
