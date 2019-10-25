'use strict';

module.exports = (app) => {
  const { router } = app;

  router.get('/isHoliday', 'home.isHoliday');
  router.get('/githubTrendingList', 'home.githubTrendingList');
  router.get('/jueJinFedList', 'home.jueJinFedList');
};
