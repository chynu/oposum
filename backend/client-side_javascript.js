// Visit: htp://edusearch-eleng555.c9users.io/
// Press F12 (open developer tools)
// In chrome console, enter:

fetch("/<video-id-here>", {
    method: "POST"
}).then((response) => {
    return response.text();
}).then((response) => {
    console.log(response);
});

// Video IDs to use - Good examples
// o69TvQqyGdg - US History - Colonizing America
// Eytc9ZaNWyc - US History - Taxes and Smuggling

// Full-text: video.google.com/timedtext?lang=en&v=<video-id-here>