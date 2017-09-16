let cues = document.getElementById('body').getElementsByClassName('cue');
Array.prototype.forEach.call(cues, (cue) => {
	console.log(cue.innerText);
});