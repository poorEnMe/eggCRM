let config = {
    local: require('./environments/local.json'),
	  production:require('./environments/local.json')
};

module.exports = config[process.env.NODE_ENV || 'local'];