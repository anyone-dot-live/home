document.addEventListener("DOMContentLoaded", async () => {
	let tagline = await loadTagline();

	terminalTypewriter(tagline);
});

function terminalTypewriter(text) {
	const speed = Math.random() * 50;

	const terminal = document.getElementById("terminal");

	let i = 0;

	const timer = setInterval(() => {
		if (i < text.length) {
			terminal.textContent += text.charAt(i);
			i++;
		}
		else {
			clearInterval(timer);
		}
	}, speed);
}

async function loadTagline() {
	try {
		// Fetch the json file
		const response = await fetch('taglines.json');

		if (!response.ok)
			throw new Error('Coud not fetch taglines: ' + response.status);

		// Get the list of taglines
		const data = await response.json();
		const taglines = data.taglines;

		if (taglines.length == 0)
			throw new Error('Could not find taglines');

		// Select a random tagline
		return getRandomTagline(taglines);
	}

	catch (error) {
		return error;
	}
}

function getRandomTagline(taglines) {
	let randomIndex = Math.floor(Math.random() * taglines.length);
	return taglines[randomIndex];
}