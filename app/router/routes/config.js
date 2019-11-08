'use strict';

module.exports = (app) => {
  const { router } = app;
  router.get('/globalConfig/insertConfig', 'config.insertConfig');
  router.get('/globalConfig/getConfigByName', 'config.getConfigByName');
  router.get('/globalConfig/getConfigList', 'config.getConfigList');
  router.get('/globalConfig/updateConfig', 'config.updateConfig');
  router.get('/globalConfig/deleteConfig', 'config.deleteConfig');
};
