'use strict';
const path = require('path');
const DBconfig = require('./env.config');
const ip = require('ip');
const isDev = process.env.NODE_ENV === 'development';

module.exports = appInfo => {
  const config = exports = {};

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1515033498492_9851';

  // add your config here
	config.middleware = [ 'webpackDev','webpackHot' ];

	// 开发模式开启，production关闭
	config.webpackDev = {
		enable: isDev
	};
	config.webpackHot = {
		enable: isDev
	};

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


	const localIP = ip.address();
	const domainWhiteList = [];
	[7001].forEach(port => {
		domainWhiteList.push(`http://localhost:${port}`);
		domainWhiteList.push(`http://127.0.0.1:${port}`);
		domainWhiteList.push(`http://${localIP}:${port}`);
	});

	config.security = {
		domainWhiteList,
		csrf: {
			headerName: 'x-csrf-token', // 通过 header 传递 CSRF token 的默认字段为 x-csrf-token
		}
	};


	return config;
};
