module.exports = {
	entry: {
		bundle: "./src/index.ts",
	},
	mode: 'development',
	output: {
		filename: "[name].js",
		globalObject: 'this',
		library: "Timeline",
		libraryTarget: "umd",
		path: __dirname + "/dist",
		publicPath: '/dist/',
	},
	resolve: {
		extensions: [".webpack.js", ".web.js", ".ts", ".tsx", ".js", ".wasm"]
	},
	module: {
		rules: [
			{
				test: /\.tsx?$/,
				loader: "ts-loader",
			}
		]
	}
}
