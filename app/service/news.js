'use strict';

const dayjs = require('dayjs');
const { limitText, deepClone } = require('../utils');

const Service = require('egg').Service;

class NewsService extends Service {
  async getAllNews() {
    const { ctx } = this;
    try {
      const fedNews = await ctx.model.FedNews.find();
      return {
        success: true,
        data: {
          list: fedNews,
          totalCount: fedNews.length,
        },
      };

    } catch (error) {
      console.warn(error);
      return {
        success: false,
        error,
      };
    }
  }

  async getFedNews(data) {
    const { ctx } = this;
    const { type = 'markdown', offset = 0, pageSize = 20 } = { ...ctx.params, ...data };

    let result = '';

    try {
      const fedNews = await ctx.model.FedNews.find({ hasPush: false }).sort({ starCount: -1 }).limit(pageSize)
        .skip(offset);
      const tasks = fedNews.map(async (item) => {
        return await this.setFedNew(deepClone({
          ...deepClone(item),
          hasPush: true,
        }));
      });

      await Promise.all(tasks);

      if (type === 'markdown') {

        const markdownText = fedNews.map((item) => {
          const {
            title,
            description,
            messageURL,
            username,
            starCount,
            forkCount = 0,
          } = deepClone(item);

          return (
            `### [${username}](https://github.com/${username})/[${title}](${messageURL})\n\n > ${limitText(description)} \n\n **star：${starCount} fork：${forkCount}**`
          );
        })
          .join('\n\n');

        result = {
          title: `${dayjs().format('YYYY-MM-DD')}前端资讯日报`,
          text: `## ${dayjs().format('YYYY-MM-DD')}前端资讯日报 \n\n ${markdownText || '暂无消息'}`,
        };
      } else if (type === 'feedCard') {
        const feedCardList = fedNews.map((item) => {
          const { description, messageURL, picURL } = item;
          return {
            title: description,
            messageURL,
            picURL,
          };
        });
        result = feedCardList;
      }

      return {
        success: true,
        data: result,
      };

    } catch (error) {
      return {
        success: false,
        error,
      };
    }
  }


  async insertFedNews(list, site) {
    const tasks = list.map(async item => await this.setFedNew(deepClone(item), site));
    try {
      await Promise.all(tasks);
      return {
        success: true,
        data: '成功',
      };
    } catch (error) {
      return {
        success: false,
        error,
      };
    }
  }

  async setFedNew(item, site) {
    const { ctx } = this;
    const fedNew = await ctx.model.FedNews.findOne({
      title: item.title,
    });
    if (!fedNew) {
      return await ctx.model.FedNews.create({
        site,
        ...item,
        hasPush: false,
      });
    }

    if ((deepClone(fedNew).starCount !== item.starCount) || (deepClone(fedNew).hasPush !== item.hasPush)) {
      const res = await ctx.model.FedNews.update({
        title: item.title,
      }, { ...item, hasPush: true });
      return res;
    }
    return Promise.resolve();
  }

  async resetHasPushProp() {
    const { ctx } = this;
    try {
      const fedNews = await ctx.model.FedNews.find({ hasPush: 1 });
      const tasks = fedNews.map(async (item) => {
        const curItem = deepClone(item);
        return await ctx.model.FedNews.update({
          title: curItem.title,
        }, { ...curItem, hasPush: false });
      });

      await Promise.all(tasks);
      return {
        success: true,
        data: {
          statusText: '重置hasPush成功',
          totalCount: fedNews.length,
        },
      };
    } catch (error) {
      console.warn(error);
      return {
        success: false,
        error,
      };
    }
  }

  async insertFedNewsDay(data = {}) {
    const { ctx } = this;
    try {
      await ctx.model.FedNewsDay.create({
        createTime: dayjs().format('YYYY-MM-DD'),
        ...data,
      });
      return {
        success: true,
        data: '日报插入成功',
      };
    } catch (error) {
      return {
        success: false,
        error,
      };
    }
  }

  async insertFedNewsWeek(data = {}) {
    const { ctx } = this;
    try {
      const { effectDate, invalidDate, text, type, title } = data;
      ctx.model.FedNewsWeek.create({
        effectDate,
        invalidDate,
        text,
        type,
        title,
      });
      return {
        success: true,
        data: '周报插入成功',
      };
    } catch (error) {
      return {
        success: false,
        error,
      };
    }
  }
}

module.exports = NewsService;
