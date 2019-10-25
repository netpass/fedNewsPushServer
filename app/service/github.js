'use strict';

const Octokit = require('@octokit/rest');
const Service = require('egg').Service;

class GithubService extends Service {
  async initGithub() {
    const { ctx } = this;
    const githubConf = await ctx.service.config.fetchConfigByName('githubConf');

    if (this.octokit) return this.octokit;

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
    await this.initGithub();
    try {
      const result = await this.octokit.issues.create({
        ...data,
      });

      ctx.status = result.status;
      ctx.body = {
        success: true,
        data: result,
      };
    } catch (error) {
      // console.warn(error);
      ctx.body = {
        success: false,
        error,
      };
    }
  }
}

module.exports = GithubService;
