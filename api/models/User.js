'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UserSchema = new Schema({
  firstName: {
    type: String,
    required: true
  },
  lastName: {
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
    select: false
  },
  role: {
    type: String,
    enum: ['employee', 'manager', 'director', 'developer'],
    required: true
  },
  avatar: {
    data: Buffer,
    type: String
  }
},{
  timestamps: true
});

module.exports = mongoose.model('User', UserSchema);
