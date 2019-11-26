'use strict';

module.exports = (app) => {
  const { router } = app;

  router.get('/sendMarkdown', 'test.sendMarkdown');
  router.get('/testGithub', 'test.testGithub');
  router.get('/testTime', 'test.testTime');
};
