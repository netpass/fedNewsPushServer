'use strict';

const dayjs = require('dayjs');
const { limitText, deepClone } = require('../utils');

const Controller = require('egg').Controller;

class NewsController extends Controller {
  async getFedNews() {
    const { ctx } = this;
    const { type = 'markdown', offset = 0, pageSize = 5 } = ctx.params;

    let result = '';

    try {
      const fedNews = await ctx.model.FedNews.find({ hasPush: false }).limit(pageSize).skip(offset);

      const tasks = fedNews.map(async (item) => {
        return await this.setFedNew({
          title: deepClone(item).title,
          hasPush: true,
        });
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

      ctx.body = { success: true, data: result };

    } catch (error) {
      ctx.body = { code: 0, success: false, error: error };
    }
  }

  async insertFedNews() {
    const { ctx } = this;
    const { site, list = [] } = ctx.params;

    const tasks = list.map(async item => await this.setFedNew(deepClone(item), site));
    try {
      await Promise.all(tasks);
      ctx.body = { success: true, data: '成功' };
    } catch (error) {
      ctx.body = { code: 0, success: false, error: error };
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
        hasPush: false,
        ...item,
      });
    }
    if (fedNew.starCount !== item.startCount) {
      return await ctx.model.FedNews.update({
        title: item.title,
      }, {
        ...item,
      });
    }
    return Promise.resolve();

  }

  async insertFedNewsDay() {
    try {
      const { ctx } = this;

      await ctx.model.FedNewsDay.create({
        createTime: dayjs().format('YYYY-MM-DD'),
        text,
        type,
        title,
      });

      ctx.body = { success: true, data: '日报插入成功' };
    } catch (error) {
      ctx.body = { code: 0, success: false, error: error };
    }
  }

  async insertFedNewsWeek() {
    const { ctx } = this;
    try {
      const { effectDate, invalidDate, text, type, title } = ctx.params;
      ctx.model.FedNewsDay.create({
        effectDate,
        invalidDate,
        text,
        type,
        title,
      });
      ctx.body = { success: true, data: '周报插入成功' };
    } catch (error) {
      ctx.body = { code: 0, success: false, error: error };
    }
  }

  async updateInfo() {
    const { ctx } = this;
    const { title } = ctx.params;
    const fedNew = await ctx.model.FedNews.update({
      title,
    }, {
      $set: {
        title: `${title}1`,
      },
    }, {
      new: true,
    });

    ctx.body = {
      success: true,
      data: {
        fedNew,
      },
    };
  }
}

module.exports = NewsController;
