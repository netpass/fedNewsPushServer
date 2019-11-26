'use strict';

const Controller = require('egg').Controller;
const dayjs = require('dayjs');

class TestController extends Controller {
  // testMarkdown push
  async sendMarkdown() {
    const { ctx } = this;
    await ctx.service.dingTalk.markdown({
      title: '多群测试前端',
      text: '发送成功',
    });
  }

  async testGithub() {
    const { ctx } = this;
    const result = await ctx.service.crawlerGithub.getChenBinReadme();
    ctx.body = result;
  }

  async testTime() {
    const { ctx } = this;
    ctx.body = {
      success: true,
      data: {
        dayjs: dayjs().format('YYYY.MM.DD HH:MM:ss'),
        newDate: dayjs(new Date()).format('YYYY.MM.DD HH:MM:ss'),
      },
    };
  }
}

module.exports = TestController;
