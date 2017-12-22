'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ProductSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  details: {
    type: String,
  },
  avatar: {
    data: Buffer,
    type: String,
    select: false
  },
  price: {
    type: Number,
    required: true
    get: getPrice,
    set: setPrice
  },
  colorTag: {
    type: String,
  },
  iconTag: {
    type: String
  },
  groupProduct: { type: Schema.Types.ObjectId, ref: 'GroupProduct' },

},{
  timestamps: true
});

function getPrice(num){
    return (num/100).toFixed(2);
}

function setPrice(num){
    return num*100;
}

module.exports = mongoose.model('Product', ProductSchema);
