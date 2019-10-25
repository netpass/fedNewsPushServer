'use strict';

module.exports = (app) => {
  const { router } = app;

  router.get('/getFedNews', 'news.getFedNews');
  router.get('/updateInfo', 'news.updateInfo');
  router.post('/insertFedNews', 'news.insertFedNews');
  router.post('/insertFedNewsDay', 'news.insertFedNewsDay');
  router.post('/insertFedNewsWeek', 'news.insertFedNewsWeek');
};
