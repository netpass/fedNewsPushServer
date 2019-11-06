'use strict';

const Controller = require('egg').Controller;

class TasksController extends Controller {
  /**
   * 获取需推送的消息插入数据库
   */
  async getDataAndInsertDB() {
    const { ctx } = this;
    const { success, data: feedCardList, error } = await ctx.service.home.githubTrendingList(ctx.params);
    if (success) {
      const res = await ctx.service.news.insertFedNews(
        feedCardList || [],
        'github'
      );
      ctx.body = res;
    } else {
      ctx.body = { success: false, error: error };
    }
  }

  /**
   * github trending list
   */
  async getDataAndPush() {
    const { ctx } = this;
    try {
      const { data: isHoliday } = await ctx.service.home.isHoliday();
      if (!isHoliday) {
        const { data: result } = await ctx.service.news.getFedNews({
          offset: 0,
          pageSize: 5,
        });
        await ctx.service.github.createIssues({
          owner: 'zhixiaoqiang',
          repo: [ 'fed-news-push', 'fedNewsPushServer' ],
          title: result.title,
          body: result.text,
          labels: [ '日报' ],
        });

        await ctx.service.news.insertFedNewsDay({
          type: 'markdown',
          title: result.title,
          text: result.text,
        });

        await ctx.service.dingTalk.markdown({
          title: result.title,
          text: `${
            result.text
          } \n\n #### [查看更多](https://github.com/zhixiaoqiang/fed-news-push/issues)`,
        });
        ctx.body = { success: true, data: '发送成功' };
      } else {
        ctx.body = { success: true, data: '今天是休息日，暂无推送' };
      }

    } catch (error) {
      console.warn(error);
      ctx.body = { code: 0, success: false, error: error };
    }
  }

  async resetHasPushProp() {
    const { ctx } = this;
    const result = await ctx.service.news.resetHasPushProp();
    ctx.body = result;
  }
}

module.exports = TasksController;
