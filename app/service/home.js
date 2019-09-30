'use strict';

const Service = require('egg').Service;
const dayjs = require('dayjs');

const isHolidayRule = {
  date: { type: 'date', required: false },
};

class HomeService extends Service {
  /**
   * 是否假期
   */
  async isHoliday(date = new Date()) {
    const { ctx } = this;

    ctx.validate(isHolidayRule, ctx.params);
    try {
      const result = await ctx.curl('http://api.goseek.cn/Tools/holiday', {
        gzip: true,
        dataType: 'json',
        date: dayjs(date).format('YYYYMMDD'),
      });

      ctx.status = result.status;
      // 正常工作日 0, 法定节假日 1, 节假日调休补班 2，休息日 3
      return result.data.data !== 0;
    } catch (error) {
      console.warn(error);
      return error;
    }
  }

  /**
   * github trending list
   */
  async githubTrendingList(data) {
    const { ctx } = this;
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
            ...data,
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
      return feedCardList;
    } catch (error) {
      console.warn(error);
      return error;
    }
  }

  /**
   * github jueJinFed list
   */
  async jueJinFedList(data) {
    const { ctx } = this;
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
            ...data,
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
      return feedCardList.filter(item => item);
    } catch (error) {
      console.warn(error);
      return error;
    }
  }
}

module.exports = HomeService;
