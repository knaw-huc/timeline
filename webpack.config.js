module.exports = {
	entry: {
		bundle: "./src/index.ts",
	},
	output: {
		filename: "[name].js",
		library: "Timeline",
		libraryTarget: "umd",
		path: __dirname + "/build"
	},
	resolve: {
		// Add '.ts' and '.tsx' as resolvable extensions.
		extensions: [".webpack.js", ".web.js", ".ts", ".tsx", ".js"]
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
