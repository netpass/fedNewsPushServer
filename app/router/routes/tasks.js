'use strict';

module.exports = (app) => {
  const { router } = app;
  router.get('/tasks/getDataAndInsertDB', 'tasks.getDataAndInsertDB');
  router.get('/tasks/getDataAndPush', 'tasks.getDataAndPush');
};
