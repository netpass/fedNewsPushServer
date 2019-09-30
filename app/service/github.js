'use strict';

const Octokit = require('@octokit/rest');
const Service = require('egg').Service;

const { githubConf } = require('../config');

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

class GithubService extends Service {
  async createIssues(data) {
    const { ctx } = this;
    try {
      const result = await octokit.issues.create({
        ...data,
      });

      ctx.status = result.status;
      ctx.body = {
        success: true,
        data: result,
      };
    } catch (error) {
      console.warn(error);
      ctx.body = {
        success: false,
        error,
      };
    }
  }
}

module.exports = GithubService;
