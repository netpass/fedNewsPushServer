'use strict';

module.exports = (app) => {
  const mongoose = app.mongoose;
  const Schema = mongoose.Schema;

  const FedNewsSchema = new Schema({
    title: { type: String },
    description: { type: String },
    messageURL: { type: String },
    picURL: { type: String },
    starCount: { type: Number },
    forkCount: { type: Number },
    username: { type: String },
    lang: { type: String },
    hasPush: { type: Object },
  });

  return mongoose.model('fedNews', FedNewsSchema);
};

