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
}

module.exports = TestController;
