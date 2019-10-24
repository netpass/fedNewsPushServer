'use strict';

module.exports = (app) => {
  const mongoose = app.mongoose;
  const Schema = mongoose.Schema;

  const FedNewsWeekSchema = new Schema({ any: {} });

  return mongoose.model('fedNewsWeek', FedNewsWeekSchema);
};

