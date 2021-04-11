const path = require('path');

module.exports = {
	mode: "development",
	devtool: "inline-source-map",
	entry: {
		main: path.resolve(__dirname, "src", "main.ts"),
	},
	output: {
		path: path.resolve(__dirname, 'dist'),
		filename: "demo.js"
	},
	resolve: {
		extensions: [".ts", ".js"],
	},
	module: {
		rules: [
			{
				test: /\.ts$/,
				loader: "ts-loader"
			}
		]
	}
};