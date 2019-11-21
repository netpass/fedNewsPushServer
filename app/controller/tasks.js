'use strict';

const Controller = require('egg').Controller;

class TasksController extends Controller {
  /**
   * 获取需推送的消息插入数据库
   */
  async getDataAndInsertDB() {
    const { ctx } = this;
    await ctx.service.tasks.getDataAndInsertDB(ctx.params);
  }

  async getJueJinDataAndInsertDB() {
    const { ctx } = this;
    await ctx.service.tasks.getJueJinDataAndInsertDB(ctx.params);
  }

  /**
   * github trending list
   */
  async getDataAndPush() {
    const { ctx } = this;
    await ctx.service.tasks.getDataAndPush(ctx.params);
  }

  async resetHasPushProp() {
    const { ctx } = this;
    await ctx.service.tasks.resetHasPushProp();
  }
}

module.exports = TasksController;
