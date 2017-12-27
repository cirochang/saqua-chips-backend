var fs = require('fs');
var url = require('url');
var mongoose = require('mongoose'),
Demand = mongoose.model('Demand');

exports.create = function(req, res){
  var demand = new Demand(req.body);
  demand.save(function(err, demand) {
    if (err)
      return res.send(500, err);
    return res.sendStatus(200);
  });
};

exports.show_all = function(req, res) {
  var query = {};
  if(req.query)
    query = req.query;
  Demand.find(query).limit(20).populate({path: 'products', model: 'Product'}).exec(function(err, demands) {
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
