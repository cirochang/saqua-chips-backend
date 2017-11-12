'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var GroupUserSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  img: {
    data: Buffer,
    type: String,
  },
  colorTag: {
    type: String,
    required: true
  },
  iconTag: {
    type: String
  },
  permissions: [{type: String}]
});

module.exports = mongoose.model('GroupUser', GroupUserSchema);
