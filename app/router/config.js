'use strict';

module.exports = (app) => {
  const { router } = app;
  router.get('/insertConfig', 'config.insertConfig');
  router.get('/getConfigByName', 'config.getConfigByName');
  router.get('/getConfigList', 'config.getConfigList');
  router.get('/updateConfig', 'config.updateConfig');
  router.get('/deleteConfig', 'config.deleteConfig');
};
