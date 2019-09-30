'use strict';

const dayjs = require('dayjs');
const { limitText, deepClone } = require('../utils');

const Service = require('egg').Service;

class NewsService extends Service {
  async getFedNews(data) {
    const { ctx } = this;
    const { type = 'markdown', offset = 0, pageSize = 20 } = { ...ctx.params, ...data };

    let result = '';

    try {
      const fedNews = await ctx.model.FedNews.find({ hasPush: false }).limit(pageSize).skip(offset);

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
          text: `## ${dayjs().format('YYYY-MM-DD')}前端资讯日报 \n\n ${markdownText}`,
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

      return result;

    } catch (error) {
      return error;
    }
  }


  async insertFedNews(list, site) {
    const tasks = list.map(async item => await this.setFedNew(deepClone(item), site));
    try {
      await Promise.all(tasks);
      return '成功';
    } catch (error) {
      return error;
    }
  }

  async setFedNew(item, site) {
    const { ctx } = this;
    const fedNew = await ctx.model.FedNews.findOne({
      title: item.title,
    });
    console.warn(fedNew);
    if (!fedNew) {
      return await ctx.model.FedNews.create({
        site,
        hasPush: false,
        ...item,
      });
    }

    if ((deepClone(fedNew).starCount !== item.starCount) || (deepClone(fedNew).hasPush !== item.hasPush)) {
      const res = await ctx.model.FedNews.update({
        title: item.title,
      }, { ...item, hasPush: true });
      console.warn(res);
      return res;
    }
    return Promise.resolve();

  }

  async insertFedNewsDay(data = {}) {
    const { ctx } = this;
    try {
      await ctx.model.FedNewsDay.create({
        createTime: dayjs().format('YYYY-MM-DD'),
        // text,
        // type,
        // title,
        ...data,
      });

      return '日报插入成功';
    } catch (error) {
      return error;
    }
  }

  async insertFedNewsWeek(data = {}) {
    const { ctx } = this;
    try {
      const { effectDate, invalidDate, text, type, title } = data;
      ctx.model.FedNewsDay.create({
        effectDate,
        invalidDate,
        text,
        type,
        title,
      });
      return '周报插入成功';
    } catch (error) {
      return error;
    }
  }
}

module.exports = NewsService;
