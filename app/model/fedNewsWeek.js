'use strict';

module.exports = (app) => {
  const mongoose = app.mongoose;
  const Schema = mongoose.Schema;

  const FedNewsWeekSchema = new Schema({
    createTime: { type: String },
    type: { type: String },
    title: { type: String },
    text: { type: String },
  });

  return mongoose.model('fedNewsWeek', FedNewsWeekSchema);
};

