'use strict';

const $ = require('cheerio');
const dayjs = require('dayjs');
const Service = require('egg').Service;

class CrawlerGithub extends Service {
  async getChenBinReadme() {
    const { ctx } = this;
    try {
      const htmlResult = await ctx.curl('https://github.com/chenbin92/zaobao', {
        dataType: 'text',
      });

      const curDate = dayjs().format('YYYY.MM.DD');

      let todayMarkdown = '';

      if (htmlResult && htmlResult.data) {
        const selector = $.load(htmlResult.data);
        selector('article h2,article ul').each(function() {
          if ($(this).text().indexOf(curDate) >= 0) {
            todayMarkdown = $(this).next().html()
              .split('\n')
              .filter(Boolean)
              .map((item) => {
                const href = $(item).find('a').attr('href');
                const text = $(item).text();
                return `[${text}](${href})`;
              })
              .join('\n\n');
          }
        });
        return {
          success: true,
          data: todayMarkdown ? {
            title: `${dayjs().format('YYYY-MM-DD')}前端资讯日报`,
            text: `## ${dayjs().format('YYYY-MM-DD')}前端资讯日报 \n\n ${todayMarkdown || '暂无消息'}`,
          } : '',
        };
      }
    } catch (error) {
      return {
        success: true,
        error,
      };
    }
  }
}

module.exports = CrawlerGithub;
