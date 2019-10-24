'use strict';

const Controller = require('egg').Controller;


class GithubController extends Controller {
  async createIssues() {
    const { ctx } = this;
    const { params } = ctx;
    const res = ctx.service.github.createIssues(params);
    ctx.body = res;
  }
}

module.exports = GithubController;
