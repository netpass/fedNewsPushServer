/* eslint valid-jsdoc: "off" */

'use strict';

const getBaseConfig = require('./config.default.js');

/**
 * @param {Egg.EggAppInfo} appInfo app info
 */
module.exports = (appInfo) => {
  const baseConfig = getBaseConfig(appInfo)
  baseConfig.mongoose = {
    client: {
      url: 'mongodb://datebase:27017/nazi',
      options: {
        autoIndex: false, // Don't build indexes
        reconnectTries: 30, // Retry up to 30 times
        reconnectInterval: 500, // Reconnect every 500ms
        poolSize: 10, // Maintain up to 10 socket connections
        // If not connected, return errors immediately rather than waiting for reconnect
        bufferMaxEntries: 0,
      },
    },
  };
  return baseConfig;
};
