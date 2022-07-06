const { Router } = require('express');

const route = Router();

route.use(require('./categories.route'));
route.use(require('./comments.route'));
route.use(require('./news.route'));
route.use(require('./users.route'));

module.exports = route;