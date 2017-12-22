'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var GroupProductSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  avatar: {
    type: Buffer,
    required: true,
    select: false
  },
  colorTag: {
    type: String
  },
  iconTag: {
    type: String
  },
  products: [{ type: Schema.Types.ObjectId, ref: 'Product' }]
},{
  timestamps: true
});

module.exports = mongoose.model('GroupProduct', GroupProductSchema);
