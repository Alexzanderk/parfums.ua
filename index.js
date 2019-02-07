const express = require('express');
const logger = require('morgan');

const config = require('./config');
const router = require('./routers');

const db = require('./services/db')

const server = express();

server.disable('view cache');

server.set('views', config.paths.views);
server.set('view engine', 'pug');

server.use(express.urlencoded({ extended: false }));
server.use(express.json());
server.use(express.static(config.paths.public));

server.use(logger('dev'));

server.use('/', router.main);



server.listen(config.port, () => console.log(`Server working on port ${config.port}`))