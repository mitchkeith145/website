var path = require('path');

module.exports = {
	entry: './src/public/js/app.js',
	output: {
		filename: './src/public/js/app-bundle.js'
	},
	module: {
	    // configuration regarding modules

	    rules: [
      	// rules for modules (configure loaders, parser options, etc.)

			{
				test: /\.jsx?$/,
				exclude: /node_modules/,
				loader: 'babel-loader',
				query: {
		          presets: ['es2015', 'react']
		        }
			}
		]
	}
}
