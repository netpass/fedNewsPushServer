'use strict';

const Service = require('egg').Service;
const Utils = require('../utils');


const configRule = {
  name: { type: 'string', required: true },
  value: { required: false },
};


class ConfigService extends Service {
  async insertConfig() {
    const { ctx } = this;
    try {
      const { name, value } = ctx.params;

      if (!name) throw '配置名入参为空';
      ctx.validate(configRule, { name, value });

      const existed = await ctx.model.Config.findOne({ name });
      if (existed) throw '当前配置名已存在';

      await ctx.model.Config.create({ name, value });
      ctx.body = {
        success: true,
        data: '添加成功',
      };
    } catch (error) {
      ctx.body = {
        success: false,
        error,
      };
    }
  }

  async fetchConfigByName(name) {
    const { ctx } = this;
    const res = await ctx.model.Config.findOne({ name });
    if (res) {
      return Utils.jsonParse(res.value);
    }

    return null;
  }

  async getConfigByName() {
    const { ctx } = this;
    try {
      const { name } = ctx.params;
      const res = await this.fetchConfigByName(name);
      const data = res || '暂无配置项';

      ctx.body = {
        success: true,
        data,
      };
    } catch (error) {
      ctx.body = {
        success: false,
        error,
      };
    }
  }

  async getConfigList() {
    const { ctx } = this;
    try {
      const res = await ctx.model.Config.find();

      const handleDate = (res) => {
        const obj = {};
        res.forEach((item) => {
          const { name, value } = item;
          obj[name] = Utils.jsonParse(value);
        });
        return obj;
      };

      const data = handleDate(res);

      ctx.body = {
        success: true,
        data,
      };
    } catch (error) {
      ctx.body = {
        success: false,
        error,
      };
    }
  }

  async updateConfig() {
    const { ctx } = this;
    try {
      const { name, value } = ctx.params;
      await ctx.model.Config.update({
        name,
      }, {
        value,
      });
      ctx.body = {
        success: true,
        data: '更新成功',
      };
    } catch (error) {
      ctx.body = {
        success: false,
        error,
      };
    }
  }

  async deleteConfig() {
    const { ctx } = this;
    try {
      const { name } = ctx.params;
      await ctx.model.Config.findOneAndRemove({
        name,
      });
      ctx.body = {
        success: true,
        data: '删除成功',
      };
    } catch (error) {
      ctx.body = {
        success: false,
        error,
      };
    }
  }
}

module.exports = ConfigService;
