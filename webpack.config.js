const path = require('path')
module.exports = {
	entry: {
		bundle: "./src/index.ts",
	},
	// entry: './src/index.ts',
	output: {
		filename: "[name].js",
		library: "Timeline",
		libraryTarget: "umd",
		path: __dirname + "/build",
		globalObject: 'this',
		publicPath: '/build/',
	},
	// output: {
	// 	path: __dirname + "/build",
	// 	// path: path.resolve(__dirname, 'build'),
	// 	filename: "index.js",
	// 	library: "Timeline",
	// 	libraryTarget: "umd",
	// 	globalObject: 'this',
	// },
	resolve: {
		// Add '.ts' and '.tsx' as resolvable extensions.
		extensions: [".webpack.js", ".web.js", ".ts", ".tsx", ".js", ".wasm"]
	},
	module: {
		rules: [
			// All files with a '.ts' or '.tsx' extension will be handled by 'awesome-typescript-loader'.
			{
				test: /\.tsx?$/,
				loader: "ts-loader",
			}
		]
	}
};
