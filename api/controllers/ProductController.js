'use strict';
var fs = require('fs');
var mongoose = require('mongoose'),
Product = mongoose.model('Product');

exports.create = function(req, res){
  var product = new Product(req.body);
  product.avatar = fs.readFileSync(req.file.path);
  product.save(function(err, product) {
    if (err)
      return res.send(500, err);
    return res.sendStatus(200);
  });
};

exports.show_all = function(req, res) {
  Product.find({}, function(err, products) {
    if (err)
      return res.send(500, err);
    return res.json(products);
  });
};

exports.show = function(req, res) {
  Product.findById(req.params.productId, function(err, product) {
    if(err)
      return res.send(500, err);
    return res.json(product);
  });
};

exports.show_avatar = function(req, res) {
  Product.findById(req.params.productId).select('+avatar').exec(function(err, product) {
      if (err)
        return res.send(500, err);
      if(!product)
        return res.send(404, 'Any Group Product was found with this id');
      res.contentType('image/png');
      return res.send(product.avatar);
  });
};

exports.update = function(req, res) {
  Product.findOneAndUpdate({_id: req.body.id}, req.body, {new: true}, function(err, product) {
    if (err)
      return res.send(500, err);
    return res.json(product);
  });
};

exports.delete = function(req, res) {
  Product.remove(req.params.productId, function(err) {
    if(err)
      return res.send(500, err);
    return res.sendStatus(200);
  });
};
