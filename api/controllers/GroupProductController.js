'use strict';

var mongoose = require('mongoose'),
GroupProduct = mongoose.model('GroupProduct');

exports.create = function(req, res){
  var groupProduct = new GroupProduct(req.body);
  groupProduct.save(function(err, user) {
    if (err)
      res.send(err);
    res.sendStatus(200);
  });
};

exports.show_groupProducts = function(req, res) {
  GroupProduct.find({}, function(err, groupProducts) {
    if (err)
      res.send(err);
    res.json(groupProducts);
  });
};

exports.show_groupProducts = function(req, res) {
  GroupProduct.find({}, function(err, groupProducts) {
    if (err)
      res.send(err);
    res.json(groupProducts);
  });
};
