'use strict';

module.exports = {
  schedule: {
    cron: '0 0 9 * * *',
    // interval: '10s',
    type: 'all', // 指定所有的 worker 都需要执行
  },
  async task(ctx) {
    console.warn('抓取数据');
    await ctx.service.tasks.getDataAndInsertDB();
    console.warn('抓取数据');
    await ctx.service.tasks.getDataAndInsertDB({
      period: 'month',
    });
  },
};
