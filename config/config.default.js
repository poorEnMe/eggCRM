'use strict';
const path = require('path');
const DBconfig = require('./env.config');

module.exports = appInfo => {
  const config = exports = {};

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1515033498492_9851';

  // add your config here
	config.middleware = [ 'webpackDev','webpackHot' ];

	config.static = {
		prefix: '/',
		dir: path.join(appInfo.baseDir, 'app/public'),
		// support lazy load
		dynamic: true,
		preload: false,
		buffer: false,
		maxFiles: 1000,
	};

	config.sequelize = {
		dialect: 'mysql',
		database: DBconfig.database.nameDB,
		host: DBconfig.database.hostDB,
		port: DBconfig.database.port,
		username: DBconfig.database.userDB,
		password: DBconfig.database.passDB
	};

	// config.security = {
	// 	csrf: {
	// 		useSession: true, // 默认为 false，当设置为 true 时，将会把 csrf token 保存到 Session 中
	// 		cookieName: 'csrfToken', // Cookie 中的字段名，默认为 csrfToken
	// 		sessionName: 'csrfToken', // Session 中的字段名，默认为 csrfToken
	// 	}
	// };

	config.security = {
		xframe: {
			enable: false,
		},
		csrf: {
			enable: false
		}
	};



	return config;
};
