'use strict';

module.exports = {
  schedule: {
    cron: '0 0 9 * * *',
    // interval: '10s',
    // type: 'all', // 指定所有的 worker 都需要执行
    type: 'worker', // 每台机器上只有一个 worker 会执行这个定时任务，每次执行定时任务的 worker 的选择是随机的
    cronOptions: {
      tz: 'Asia/Shanghai',
    },
  },
  async task(ctx) {
    console.warn('抓取Trending week数据');
    await ctx.service.tasks.getDataAndInsertDB();
    console.warn('抓取掘金数据');
    await ctx.service.tasks.getJueJinDataAndInsertDB();

    console.warn('抓取Trending month数据');
    await ctx.service.tasks.getDataAndInsertDB({
      period: 'month',
    });
  },
};
