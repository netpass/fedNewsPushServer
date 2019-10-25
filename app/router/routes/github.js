'use strict';

module.exports = (app) => {
  const { router, controller } = app;

  router.post('/github/createIssues', controller.github.createIssues);
};
