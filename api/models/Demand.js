'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var DemandSchema = new Schema({
  status: {
    type: [{
      type: String,
      enum: ['pending', 'doing', 'done', 'finished', 'canceled']
    }],
    default: ['pending'],
    index: true
  },
  details: {
    type: String,
  },
  product: [{ type: Schema.Types.ObjectId, ref: 'Product' }]
},{
  timestamps: true
});

module.exports = mongoose.model('Demand', DemandSchema);
