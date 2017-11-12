'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var GroupProductSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  img: {
    data: Buffer,
    type: String,
    required: true
  },
  colorTag: {
    type: String,
    required: true
  },
  iconTag: {
    type: String
  },
  products: [{ type: Schema.Types.ObjectId, ref: 'Product' }]
});

module.exports = mongoose.model('GroupProduct', GroupProductSchema);
