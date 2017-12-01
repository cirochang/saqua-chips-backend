'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UserSchema = new Schema({
  first_name: {
    type: String,
    required: true
  },
  last_name: {
    type: String,
    required: true
  },
  username: {
    type: String,
    unique: true,
    required: true,
    trim: true,
    index: true,
    lowercase: true
  },
  password: {
    type: String,
    required: true,
  },
  avatar: {
    data: Buffer,
    type: String
  },
  created_at: {
    type: Date,
    default: Date.now
  },
  updated_at: {
    type: Date,
    default: Date.now
  },
  groupUser: { type: Schema.Types.ObjectId, ref: 'GroupUser' },

});

module.exports = mongoose.model('User', UserSchema);
