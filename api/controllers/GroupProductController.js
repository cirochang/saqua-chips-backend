'use strict';
var fs = require('fs');
var mongoose = require('mongoose'),
GroupProduct = mongoose.model('GroupProduct');

exports.create = function(req, res){
  var groupProduct = new GroupProduct({
    name: req.body.name,
    avatar: fs.readFileSync(req.file.path)
  });
  groupProduct.save(function(err, user) {
    if (err) {
      res.send(err);
    }else{
      res.sendStatus(200);
    }
  });
};

exports.show_groupProducts = function(req, res) {
  GroupProduct.find({}, function(err, groupProducts) {
    if (err)
      res.send(err);
    res.json(groupProducts);
  });
};

exports.show_avatar = function(req, res) {
  GroupProduct.findById(req.params.groupProductId, function(err,groupProduct) {
      if (err) {
        res.send(err);
      } else {
        res.contentType('image/png');
        res.send(groupProduct.avatar);
      }
  });
}

exports.update = function(req, res) {
  GroupProduct.findOneAndUpdate({_id: req.body.id}, req.body, {new: true}, function(err, task) {
    if (err)
      res.send(err);
    res.sendStatus(200);
  });
};
