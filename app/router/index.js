'use strict';

const dingTalk = require('./dingTalk');
const github = require('./github');
const home = require('./home');
const news = require('./news');
const tasks = require('./tasks');

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = (app) => {
  home(app);
  dingTalk(app);
  github(app);
  news(app);
  tasks(app);
};
