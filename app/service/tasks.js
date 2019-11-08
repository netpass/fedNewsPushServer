'use strict';

const Service = require('egg').Service;

class Tasks extends Service {
  /**
   * 获取需推送的消息插入数据库
   */
  async getDataAndInsertDB(data = {}) {
    const { ctx } = this;
    const { success, data: feedCardList, error } = await ctx.service.home.githubTrendingList(data);
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
  async getDataAndPush(data = {}) {
    const { ctx } = this;
    try {
      const { data: isHoliday } = await ctx.service.home.isHoliday();
      if (!isHoliday) {

        let finalResult = '';

        const { data: chenBinReadmeResult } = await ctx.service.crawlerGithub.getChenBinReadme();

        if (chenBinReadmeResult) {
          finalResult = chenBinReadmeResult;
        } else {
          const { data: trendingResult } = await ctx.service.news.getFedNews({
            offset: 0,
            pageSize: 5,
            ...data,
          });
          finalResult = trendingResult;
        }


        await ctx.service.github.createIssues({
          owner: 'zhixiaoqiang',
          repo: [ 'fed-news-push', 'fedNewsPushServer' ],
          title: finalResult.title,
          body: finalResult.text,
          labels: [ '日报' ],
        });

        await ctx.service.news.insertFedNewsDay({
          type: 'markdown',
          title: finalResult.title,
          text: finalResult.text,
        });

        await ctx.service.dingTalk.markdown({
          title: finalResult.title,
          text: `${
            finalResult.text
          } \n\n #### [查看更多](https://github.com/zhixiaoqiang/fedNewsPushServer/issues)`,
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
module.exports = Tasks;
