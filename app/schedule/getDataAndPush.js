'use strict';

module.exports = {
  schedule: {
    cron: '0 30 9 * * *',
    type: 'all', // 指定所有的 worker 都需要执行
  },
  async task(ctx) {
    await ctx.service.tasks.getDataAndPush();
  },
};
