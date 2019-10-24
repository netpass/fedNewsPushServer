'use strict';

module.exports = (app) => {
  const mongoose = app.mongoose;
  const Schema = mongoose.Schema;

  const ConfigSchema = new Schema({
    name: { type: String },
    value: { type: JSON || String },
  });

  return mongoose.model('config', ConfigSchema);
};

