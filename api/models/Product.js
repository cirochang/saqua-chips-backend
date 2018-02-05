var mongoose = require('mongoose');
var mongooseStringQuery = require('mongoose-string-query');
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
    type: Buffer,
    select: false,
  },
  price: {
    type: Number,
    required: true,
    get: getPrice,
    set: setPrice
  },
  colorTag: {
    type: String,
  },
  iconTag: {
    type: String
  },
  deleted: {
    type: Boolean,
    index: true,
    default: false
  },
  groupProduct: { type: Schema.Types.ObjectId, ref: 'GroupProduct', required: true },

},{
  timestamps: true
});

function getPrice(num){
    return (num/100).toFixed(2);
}

function setPrice(num){
    return num*100;
}

ProductSchema.plugin(mongooseStringQuery);

module.exports = mongoose.model('Product', ProductSchema);
