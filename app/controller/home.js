'use strict';

const Controller = require('egg').Controller;

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
    ctx.validate(isHolidayRule, { date });

    const res = await ctx.service.home.isHoliday(date);
    ctx.body = res;
  }

  /**
   * github trending list
   */
  async githubTrendingList() {
    const { ctx } = this;
    const { params } = ctx;
    const res = await ctx.service.home.githubTrendingList(params);

    ctx.body = res;
  }

  /**
   * github jueJinFed list
   */
  async jueJinFedList() {
    const { ctx } = this;
    const { params } = ctx;
    const res = await ctx.service.home.jueJinFedList(params);

    ctx.body = res;
  }

  // 封装统一的调用检查函数，可以在查询、创建和更新等 Service 中复用
  // checkSuccess(result) {
  //   if (result.status !== 200) {
  //     const errorMsg =
  //       result.data && result.data.error_msg
  //         ? result.data.error_msg
  //         : 'unknown error';
  //     this.ctx.throw(result.status, errorMsg);
  //   }
  //   if (!result.data.success) {
  //     // 远程调用返回格式错误
  //     this.ctx.throw(500, 'remote response error', { data: result.data });
  //   }
  // }
}

module.exports = HomeController;
