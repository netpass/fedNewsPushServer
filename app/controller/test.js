'use strict';

const Controller = require('egg').Controller;

class TestController extends Controller {
  // testMarkdown push
  async sendMarkdown() {
    const { ctx } = this;
    await ctx.service.dingTalk.markdown({
      title: '多群测试',
      text: '发送成功',
    });
  }

  async testGithub() {
    const { ctx } = this;
    const result = await ctx.service.crawlerGithub.getChenBinReadme();
    ctx.body = result;
  }
}

module.exports = TestController;
