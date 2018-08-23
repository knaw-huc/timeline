const webpackConfig = require('./webpack.config')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')

module.exports = () => {
	webpackConfig.mode = "production"
	webpackConfig.output.filename =  "[name].min.js"
	return webpackConfig
}