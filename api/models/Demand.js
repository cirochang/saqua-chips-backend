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
  ticket: {
    type: Number,
    required: true
  },
  products: [{
    type: Schema.Types.ObjectId,
    ref: 'Product'
  }]
},{
  timestamps: true
});

DemandSchema.index({createAt: 1});
DemandSchema.index({updateAt: 1});

DemandSchema.pre('save', function(next) {
  if(this.products.length > 0){
    next();
  } else{
    next(new Error('A demanda precisa de pelo menos de um produto'));
  }
});

module.exports = mongoose.model('Demand', DemandSchema);
