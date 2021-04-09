const path = require("path");
const express = require("express");

const app = express();
const PORT = 8080;

app.use(express.static("assets"));

app.get("/", (req, res) => {
	const indexPath = path.join(__dirname, "index.html");
	res.sendFile(indexPath);
});

app.listen(PORT, () => {
	console.log(`Start listening requests on port ${PORT}...`);
})