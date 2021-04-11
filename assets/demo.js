function main() {
	const screen = document.getElementById("screen");
	if (screen) {
		alert("Fully loaded");
	} else {
		alert("Nope");
	}
}

document.addEventListener("DOMContentLoaded", main);