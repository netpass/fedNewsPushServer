'use strict';

const Controller = require('egg').Controller;
const { dingTalkConf } = require('../config');
const { dingtalkUrl } = dingTalkConf;

class DingTalkController extends Controller {
  /**
   * 通用钉钉消息接口
   * @param {*} data 任意钉钉格式
   */
  async send(data) {
    const { ctx } = this;
    try {
      const result = await ctx.curl(dingtalkUrl, {
        method: 'POST',
        dataType: 'json',
        contentType: 'json',
        data,
      });
      ctx.status = result.status;
      ctx.body = {
        success: true,
        data: result.data,
      };
    } catch (error) {
      ctx.body = {
        success: false,
        error,
      };
    }
  }

  /**
   * 钉钉文本推送
   */
  async text() {
    const { ctx } = this;
    const { text, isAtAll, mobile = '15057594294' } = ctx.params;

    const body = {
      msgtype: 'text',
      text: {
        content: `${text} @${mobile}`,
      },
      at: {
        atMobiles: [ mobile ],
        isAtAll,
      },
    };

    await this.send(body);
  }

  /**
   * 钉钉链接推送
   */
  async link() {
    const { ctx } = this;
    const { params } = ctx;
    const body = {
      msgtype: 'link',
      link: params,
    };

    await this.send(body);
  }

  /**
   * 钉钉markdown推送
   */
  async markdown() {
    const { ctx } = this;
    const { title, text, isAtAll, mobile = '15057594294' } = ctx.params;

    const body = {
      msgtype: 'markdown',
      markdown: {
        title,
        text,
      },
      at: {
        atMobiles: [ mobile ],
        isAtAll,
      },
    };

    await this.send(body);
  }

  /**
   * 钉钉actionCard推送
   */
  async actionCard() {
    const { ctx } = this;
    const { params } = ctx;

    const body = {
      msgtype: 'actionCard',
      actionCard: params,
    };

    await this.send(body);
  }

  /**
 * 钉钉feedCard推送
 */
  async feedCard() {
    const { ctx } = this;
    const { params } = ctx;
    const body = {
      msgtype: 'feedCard',
      feedCard: {
        links: params,
      },
    };

    await this.send(body);
  }
}

module.exports = DingTalkController;
