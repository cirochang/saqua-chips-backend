'use strict';

var mongoose = require('mongoose'),
Product = mongoose.model('Product');

exports.create = function(req, res){
  var product = new Product(req.body);
  product.save(function(err, user) {
    if (err)
      res.send(err);
    res.sendStatus(200);
  });
};

exports.show_products = function(req, res) {
  Product.find({}, function(err, products) {
    if (err)
      res.send(err);
    res.json(products);
  });
};

exports.show_product = function(req, res) {
  Product.findOne({_id: req.params.id}, function(err, product) {
    if (err)
      res.send(err);
    res.json(product);
  });
};
