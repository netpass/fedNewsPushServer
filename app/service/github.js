'use strict';

const Octokit = require('@octokit/rest');
const Service = require('egg').Service;

class GithubService extends Service {
  async initGithub() {
    const { ctx } = this;
    if (this.octokit) return this.octokit;
    const githubConf = await ctx.service.config.fetchConfigByName('githubConf');
    const octokit = new Octokit({
      auth: githubConf.auth,
      // previews: ['jean-grey', 'symmetra'],
      baseUrl: 'https://api.github.com',
      log: {
        debug() {},
        info() {},
        warn: console.warn,
        error: console.error,
      },
      request: {
        agent: undefined,
        fetch: undefined,
        timeout: 0,
      },
    });
    this.octokit = octokit;
  }

  async createIssues(data) {
    const { ctx } = this;
    try {
      await this.initGithub();

      const { repo, ...other } = data;
      const createIssuesTasks = repo.map(async (value) => {
        return await this.octokit.issues.create({ ...other, repo: value });
      });

      await Promise.all(createIssuesTasks);
      ctx.body = {
        success: true,
        data: 'issues 创建成功',
      };
    } catch (error) {
      const markdownProps = {
        title: 'issues 添加失败',
        text: 'issues 添加失败',
      };

      if (error && error.status === 401) {
        markdownProps.title = 'github token 失效';
        markdownProps.text = 'github token 失效, [请前往查看](https://github.com/settings/tokens)';
      }

      await ctx.service.dingTalk.markdown(markdownProps);
      ctx.body = {
        success: false,
        error,
      };
    }
  }
}

module.exports = GithubService;
