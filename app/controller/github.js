'use strict';

const Octokit = require('@octokit/rest');
const Controller = require('egg').Controller;

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

class GithubController extends Controller {
  async createIssues() {
    const { ctx } = this;
    const { params } = ctx;
    try {
      const result = await octokit.issues.create({
        ...params,
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

module.exports = GithubController;
