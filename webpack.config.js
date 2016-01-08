'use strict';

let webpack = require('webpack');

const APP = __dirname;

module.exports = {
	context: APP,

	entry: ['webpack/hot/dev-server', './app/app.js'],

	output: {
		path: './app/',
		filename: 'bundle.js'
	},

	module: {
		loaders: [
			{
				test: /\.js$/,
				loader: 'babel',
				exclude: /node_modules/,
				query: {
					presets: ['es2015']
				}
			},

			{
				test: /\.scss$/,
				loader: 'style!css!sass'
			},

			{
				test: /\.jade$/,
				loader: 'ng-cache!jade-html'
			}
		]
	},

	resolve: {
		extensions: ['', '.js', '.scss', '.jade'],
		modulesDirectory: ['node_modules']
	}
};
