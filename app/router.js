'use strict';

const router = require('./router/index');

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = (app) => {
  router(app);
};
