'use strict';

module.exports = (app) => {
  const mongoose = app.mongoose;
  const Schema = mongoose.Schema;

  const FedNewsDaySchema = new Schema({ any: {} });

  return mongoose.model('fedNewsDay', FedNewsDaySchema);
};

