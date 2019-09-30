'use strict';

const Controller = require('egg').Controller;
const dayjs = require('dayjs');

const isHolidayRule = {
  date: { type: 'date', required: false },
};

class HomeController extends Controller {
  /**
   * 是否假期
   */
  async isHoliday() {
    const { ctx } = this;

    const { date = new Date() } = ctx.params;
    ctx.validate(isHolidayRule, ctx.params);
    try {
      const result = await ctx.curl('http://api.goseek.cn/Tools/holiday', {
        gzip: true,
        dataType: 'json',
        date: dayjs(date).format('YYYYMMDD'),
      });

      ctx.status = result.status;
      // 正常工作日 0, 法定节假日 1, 节假日调休补班 2，休息日 3
      ctx.body = {
        success: true,
        data: result.data.data !== 0,
      };
    } catch (error) {
      console.warn(error);
      ctx.body = {
        success: false,
        error,
      };
    }
  }

  /**
   * github trending list
   */
  async githubTrendingList() {
    const { ctx } = this;
    const { params } = ctx;
    try {
      const result = await ctx.curl(
        'https://extension-ms.juejin.im/resources/github',
        {
          method: 'POST',
          dataType: 'json',
          contentType: 'json',
          data: {
            category: 'trending',
            lang: 'javascript',
            limit: 30,
            offset: 0,
            period: 'week',
            ...params,
          },
        }
      );

      const feedCardList = result.data.data.map((item) => {
        const {
          starCount,
          forkCount,
          description,
          detailPageUrl,
          username,
          lang,
          reponame,
          owner: { url },
        } = item;
        return {
          title: reponame,
          description,
          messageURL: detailPageUrl,
          picURL: url,
          starCount,
          forkCount,
          username,
          lang,
        };
      });

      ctx.status = result.status;
      ctx.body = {
        success: true,
        data: feedCardList,
      };
    } catch (error) {
      console.warn(error);
      ctx.body = {
        success: false,
        error,
      };
    }
  }

  /**
   * github jueJinFed list
   */
  async jueJinFedList() {
    const { ctx } = this;
    const { params } = ctx;
    try {
      const result = await ctx.curl(
        'https://extension-ms.juejin.im/resources/gold',
        {
          method: 'POST',
          dataType: 'json',
          contentType: 'json',
          data: {
            category: 'frontend',
            limit: 30,
            offset: 0,
            order: 'heat',
            ...params,
          },
        }
      );

      const feedCardList = result.data.data.map((item) => {
        const {
          title,
          url,
          collectionCount,
          user: { username, avatar, url: userUrl },
        } = item;

        if (collectionCount < 100) {
          return null;
        }
        return {
          title,
          messageURL: url,
          picURL: avatar,
          starCount: collectionCount,
          username,
          avatar,
          userUrl,
          lang: '前端',
        };
      });

      ctx.status = result.status;
      ctx.body = {
        success: true,
        data: feedCardList.filter(item => item),
      };
    } catch (error) {
      console.warn(error);
      ctx.body = {
        success: false,
        error,
      };
    }
  }

  // 封装统一的调用检查函数，可以在查询、创建和更新等 Service 中复用
  checkSuccess(result) {
    if (result.status !== 200) {
      const errorMsg =
        result.data && result.data.error_msg
          ? result.data.error_msg
          : 'unknown error';
      this.ctx.throw(result.status, errorMsg);
    }
    if (!result.data.success) {
      // 远程调用返回格式错误
      this.ctx.throw(500, 'remote response error', { data: result.data });
    }
  }
}

module.exports = HomeController;
