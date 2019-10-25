'use strict';

module.exports = (app) => {
  const { router } = app;

  router.get('/sendMarkdown', 'test.sendMarkdown');
};
