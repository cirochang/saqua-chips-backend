'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var DemandSchema = new Schema({
  status: {
    type: [{
      type: String,
      enum: ['pendente', 'fazendo', 'pronto', 'completado', 'cancelado']
    }],
    default: ['pendente']
    index: true
  },
  details: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    index: true
  },
  updatedAt: {
    type: Date,
    default: Date.now
  },
  product: [{ type: Schema.Types.ObjectId, ref: 'Product' }]
});

module.exports = mongoose.model('Demand', DemandSchema);
