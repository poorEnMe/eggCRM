const webpackMiddleware = require('koa-webpack-dev-middleware');
const clientConfig = require('../../build/webpack.client.config');
const webpack = require('webpack');

// module.exports = (options, app) => {
// 	//return webpackMiddleware(options.compiler, options.others);
//
// 	let bundle;
// 	let template;
//
// 	// modify client config to work with hot middleware
// 	clientConfig.entry.app = ['webpack-hot-middleware/client', clientConfig.entry.app]
// 	clientConfig.output.filename = '[name].js';
// 	clientConfig.plugins.push(
// 		new webpack.HotModuleReplacementPlugin(),
// 		new webpack.NoEmitOnErrorsPlugin()
// 	);
// 	const clientCompiler = webpack(clientConfig);
//
// 	const devMiddleware = require('webpack-dev-middleware')(clientCompiler, {
// 		publicPath: clientConfig.output.publicPath,
// 		stats: {
// 			colors: true,
// 			chunks: false
// 		}
// 	});
// 	return devMiddleware;
//
// };

module.exports = (options, app) => {
	clientConfig.output.filename = '[name].js';
	clientConfig.plugins.push(
		new webpack.HotModuleReplacementPlugin(),
		new webpack.NoEmitOnErrorsPlugin()
	);

	return webpackMiddleware(webpack(clientConfig), {
		publicPath: clientConfig.output.publicPath,
		stats: {
			colors: true,
			chunks: false
		}
	});
};
