const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

module.exports = {
	mode: "development", // Change to "production" in production config
	entry: {
		home: "./js/pages/home.js",
		// page2: "./src/page2/app.js",
	},
	output: {
		filename: "[name]/script.js",
		path: path.resolve(__dirname, "dev"), // or "build" for production
	},
	module: {
		rules: [
			{
				test: /\.js$/i,
				exclude: /node_modules/,
				use: {
					loader: "babel-loader",
					options: {
						presets: ["@babel/preset-env"],
						plugins: [
							"@babel/plugin-transform-runtime",
							"@babel/plugin-proposal-class-properties",
							"@babel/plugin-proposal-object-rest-spread",
						],
					},
				},
			},
			{
				test: /\.css$/i,
				use: ["style-loader", "css-loader"],
			},
			{
				test: /\.(png|jpg|gif)$/i,
				type: "asset/resource",
			},
		],
	},
	plugins: [
		new CleanWebpackPlugin(),

		// One HtmlWebpackPlugin per page
		new HtmlWebpackPlugin({
			filename: "home/index.html",
			template: "./index.html",
			chunks: ["home"],
			inject: "body",
		}),
		// new HtmlWebpackPlugin({
		// 	filename: "page2/index.html",
		// 	template: "./src/page2/index.html",
		// 	chunks: ["page2"],
		// 	inject: "body",
		// }),
	],
	devtool: "source-map",
};
