'use strict';

module.exports = (app) => {
  const { router } = app;

  router.get('/news/getFedNews', 'news.getFedNews');
  router.post('/news/insertFedNews', 'news.insertFedNews');
  router.post('/news/insertFedNewsDay', 'news.insertFedNewsDay');
  router.post('/news/insertFedNewsWeek', 'news.insertFedNewsWeek');
};
