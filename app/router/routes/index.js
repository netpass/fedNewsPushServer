'use strict';

const dingTalk = require('./dingTalk');
const github = require('./github');
const home = require('./home');
const news = require('./news');
const tasks = require('./tasks');
const test = require('./test');
const config = require('./config');

module.exports = [
  dingTalk,
  github,
  home,
  news,
  tasks,
  test,
  config,
];
