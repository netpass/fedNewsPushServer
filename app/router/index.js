'use strict';

const routes = require('./routes');

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = (app) => {
  routes.forEach(fn => fn(app));
};
