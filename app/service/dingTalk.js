/* eslint-disable jsdoc/require-param */
'use strict';

const Service = require('egg').Service;

class DingTalkService extends Service {
  /**
   * 通用钉钉消息接口
   * @param {*} data 任意钉钉格式
   */
  async send(data = {}, url) {
    const { ctx } = this;
    try {

      let dingTalkUrls = '';
      if (!url) {
        const dingTalkConf = await ctx.service.config.fetchConfigByName('dingTalkConf');

        if (!dingTalkConf) throw 'dingTalkConf配置丢失，请检查';
        dingTalkUrls = dingTalkConf.dingTalkUrls;
      } else {
        dingTalkUrls = [ url ];
      }


      const tasks = dingTalkUrls.map(async (src) => {
        return await ctx.curl(src, {
          method: 'POST',
          dataType: 'json',
          contentType: 'json',
          data,
        });
      });

      await Promise.all(tasks);

      ctx.body = {
        success: true,
        data: '发送成功',
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
  async text(data = {}) {
    const { text, isAtAll, mobile = '15057594294', url } = data;

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

    await this.send(body, url);
  }

  /**
   * 钉钉链接推送
   */
  async link(data = {}) {
    const { url, ...other } = data || {};
    const body = {
      msgtype: 'link',
      link: other,
    };

    await this.send(body, url);
  }

  /**
   * 钉钉markdown推送
   */
  async markdown(data = {}) {
    const { title, text, isAtAll, mobile = '15057594294', url } = data;

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

    await this.send(body, url);
  }

  /**
   * 钉钉actionCard推送
   */
  async actionCard(data) {
    const { url, ...other } = data || {};
    const body = {
      msgtype: 'actionCard',
      actionCard: other,
    };

    await this.send(body, url);
  }

  /**
 * 钉钉feedCard推送
 */
  async feedCard(data) {
    const { url, ...other } = data || {};
    const body = {
      msgtype: 'feedCard',
      feedCard: {
        links: other,
      },
    };

    await this.send(body, url);
  }
}

module.exports = DingTalkService;
