'use strict';
const dayjs = require('dayjs');

module.exports = {
  schedule: {
    cron: '0 0 10 * * *',
    // type: 'all', // 指定所有的 worker 都需要执行
    type: 'worker', // 每台机器上只有一个 worker 会执行这个定时任务，每次执行定时任务的 worker 的选择是随机的
    cronOptions: {
      tz: 'Asia/Shanghai',
    },
  },
  async task(ctx) {
    console.log(`推送数据中, ${dayjs().format('YYYY-MM-DD HH:MM:ss')}`);
    await ctx.service.tasks.getDataAndPush();
    console.log(`推送数据完成, ${dayjs().format('YYYY-MM-DD HH:MM:ss')}`);
  },
};
