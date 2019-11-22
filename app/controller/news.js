'use strict';

const Controller = require('egg').Controller;

class NewsController extends Controller {
  async getAllNews() {
    const { ctx } = this;
    const res = await ctx.service.news.getAllNews();
    ctx.body = res;
  }

  async getFedNews() {
    const { ctx } = this;
    const res = await ctx.service.news.getFedNews();
    ctx.body = res;
  }

  async insertFedNews() {
    const { ctx } = this;
    const { site, list = [] } = ctx.params;

    const res = await ctx.service.news.insertFedNews(list, site);
    ctx.body = res;
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
      return await ctx.model.FedNews.updateOne({
        title: item.title,
      }, {
        ...item,
      });
    }
    return Promise.resolve();

  }

  async insertFedNewsDay() {
    const { ctx } = this;

    const res = await ctx.service.news.insertFedNewsDay(ctx.params);
    ctx.body = res;
  }

  async insertFedNewsWeek() {
    const { ctx } = this;
    const res = ctx.service.news.insertFedNewsWeek(ctx.params);
    ctx.body = res;
  }
}

module.exports = NewsController;
