'use strict';

// const dayjs = require('dayjs');

module.exports = {
  schedule: {
    cron: '0 38 15 * * *',
    // interval: '10s',
    // type: 'all', // 指定所有的 worker 都需要执行
    type: 'worker', // 每台机器上只有一个 worker 会执行这个定时任务，每次执行定时任务的 worker 的选择是随机的
    cronOptions: {
      tz: 'Asia/Shanghai',
    },
  },
  async task(ctx) {
    // console.warn('test 15:38:00的定时任务');
    // ctx.logger.info('test 15:38:00的定时任务');
    // await ctx.service.dingTalk.markdown({
    //   title: '前端测试定时任务',
    //   text: `前端测试定时任务${dayjs().format('YYYY-MM-DD HH:MM:ss')}`,
    // });
  },
};
