'use strict';

const Controller = require('egg').Controller;

class DingTalkController extends Controller {

  /**
   * 钉钉文本推送
   */
  async text() {
    const { ctx } = this;
    const { params } = ctx;
    await ctx.service.dingTalk.test(params);
  }

  /**
   * 钉钉链接推送
   */
  async link() {
    const { ctx } = this;
    const { params } = ctx;
    await ctx.service.dingTalk.link(params);
  }

  /**
   * 钉钉markdown推送
   */
  async markdown() {
    const { ctx } = this;
    const { params } = ctx;
    await ctx.service.dingTalk.markdown(params);
  }

  /**
   * 钉钉actionCard推送
   */
  async actionCard() {
    const { ctx } = this;
    const { params } = ctx;
    await ctx.service.dingTalk.actionCard(params);
  }

  /**
 * 钉钉feedCard推送
 */
  async feedCard() {
    const { ctx } = this;
    const { params } = ctx;
    await ctx.service.dingTalk.feedCard(params);
  }
}

module.exports = DingTalkController;
