'use strict';

module.exports = {
  schedule: {
    cron: '*/5 * * * * *',
    // interval: '10s',
    type: 'all', // 指定所有的 worker 都需要执行
    cronOptions: {
      tz: 'Asia/Shanghai',
    },
  },
  async task(ctx) {
    ctx.logger.info('抓取数据');
    // await ctx.service.dingTalk.markdown({
    //   title: '前端测试定时任务',
    //   text: '发送成功',
    // });
  },
};
