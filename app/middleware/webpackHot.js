
const clientConfig = require('../../build/webpack.client.config');
const webpack = require('webpack');
const createHotMiddleware = require('koa-webpack-dev-middleware')


module.exports = (options, app) => {
	// modify client config to work with hot middleware
	// clientConfig.entry.app = [ clientConfig.entry.app];
	clientConfig.output.filename = '[name].js';
	clientConfig.plugins.push(
		new webpack.HotModuleReplacementPlugin(),
		new webpack.NoEmitOnErrorsPlugin()
	);
	const clientCompiler = webpack(clientConfig);

	return createHotMiddleware(clientCompiler);

};
