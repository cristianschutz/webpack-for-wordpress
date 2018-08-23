const path = require('path')
const BrowserSyncPlugin = require('browser-sync-webpack-plugin')
const webpack = require('webpack')
const MiniCssExtractPlugin = require("mini-css-extract-plugin")
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin")
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const devMode = process.env.NODE_ENV !== 'production'
var ImageminPlugin = require('imagemin-webpack-plugin').default


module.exports = {

   	entry: './assets/scripts/app.js',
	output: {
		path: path.resolve(__dirname, 'assets/js/'),
		filename: 'app.bundle.js'
	},
   	plugins: [
	    new MiniCssExtractPlugin({
			filename: '../../assets/css/app.css',
			publicPath: './',
			comments: false
	    }),
		new BrowserSyncPlugin({
			host: 'start.local',
			proxy: 'http://start.local'
		}),
	    new webpack.ProvidePlugin({
		    $: "jquery",
		    jQuery: "jquery",
		    "window.jQuery": "jquery"
	    }),
	    new ImageminPlugin({
  			disable: process.env.NODE_ENV !== 'production',
			minFileSize: 10000,
			jpegtran: { progressive: true }
	    })
 	],	
   	module: {
		rules: [
			{
				test: /\.(sa|sc|c)ss$/,
				exclude: [ path.resolve(__dirname, "node_modules"), path.resolve(__dirname, "assets/css")],
				use: [
					  MiniCssExtractPlugin.loader,
					  'css-loader',
					  'sass-loader',
				],
			},
		    {
				test: /\.js$/,
				exclude: [ path.resolve(__dirname, "node_modules"), path.resolve(__dirname, "assets/js")],
				loader: 'babel-loader'
			},
            {
                test: /\.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
                exclude: [ path.resolve(__dirname, "node_modules"), path.resolve(__dirname, "assets/images")],
                use: [{
                    loader: 'file-loader',
					options: {
						name: '[name].[ext]',
						outputPath: '../webfonts/'
					}
                }]
            },
            {
				test: /\.(gif|png|jpe?g|svg)$/i,
				exclude: [ path.resolve(__dirname, "node_modules"), path.resolve(__dirname, "assets/webfonts")],
                use: [{
                    loader: 'file-loader',
					options: {
						name: '[name].[ext]',
						outputPath: '../images/'
					},
                }]
			}
		],
	},
	optimization: {
		minimizer: [
			new UglifyJsPlugin({
				uglifyOptions: {
					output: {
						comments: false
					}
				}
			}),
			new OptimizeCSSAssetsPlugin({
				cssProcessor: require('cssnano'),
				cssProcessorOptions: { discardComments: { removeAll: true } }
			})
		]
	},
	watchOptions: {
		ignored: [
			path.resolve(__dirname, "assets/js/*"),
			path.resolve(__dirname, "assets/css/*"),
			path.resolve(__dirname, "assets/images/*"),
			path.resolve(__dirname, "assets/webfonts/*"),
			path.resolve(__dirname, "assets/node_modules/*"),
		]
	}
};
