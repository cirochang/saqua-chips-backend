'use strict';
var fs = require('fs');
var mongoose = require('mongoose'),
Demand = mongoose.model('Demand');

exports.create = function(req, res){
  var demand = new Demand(req.body);
  Demand.save(function(err, demand) {
    if (err)
      return res.send(500, err);
    return res.sendStatus(200);
  });
};

exports.show_all = function(req, res) {
  Demand.find({}).limit(20).exec(function(err, demands) {
    if (err)
      return res.send(500, err);
    return res.json(demands);
  });
};

exports.show = function(req, res) {
  Demand.findById(req.params.demandId, function(err, demand) {
    if(err) {
      res.send(500, err);
    } else {
      res.json(demand);
    }
  });
};

exports.update = function(req, res) {
  Demand.findOneAndUpdate({_id: req.params.demandId}, req.body, {new: true}, function(err, demand) {
    if (err)
      return res.send(500, err);
    return res.json(demand);
  });
};

exports.delete = function(req, res) {
  Demand.remove(req.params.demandId, function(err) {
    if(err) {
      res.send(500, err);
    } else {
      res.sendStatus(200);
    }
  });
};
