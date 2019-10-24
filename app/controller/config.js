'use strict';

const Controller = require('egg').Controller;

class ConfigController extends Controller {
  async insertConfig() {
    const { ctx } = this;
    await ctx.service.config.insertConfig();
  }
  async getConfigByName() {
    const { ctx } = this;
    await ctx.service.config.getConfigByName();
  }
  async getConfigList() {
    const { ctx } = this;
    await ctx.service.config.getConfigList();
  }
  async updateConfig() {
    const { ctx } = this;
    await ctx.service.config.updateConfig();
  }
  async deleteConfig() {
    const { ctx } = this;
    await ctx.service.config.deleteConfig();
  }
}

module.exports = ConfigController;

