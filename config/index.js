const path = require('path');
const ROOT_PATH = path.resolve(__dirname, '..');

module.exports = {
	port: process.env.PORT || 3005,
	paths: {
		views: path.resolve(ROOT_PATH, 'views'),
		public: path.resolve(ROOT_PATH, 'public'),
	},
	mongodbMlab: 'mongodb://superman:qwerty1@ds125525.mlab.com:25525/parfums'
};