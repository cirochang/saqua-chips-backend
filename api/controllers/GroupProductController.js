var fs = require('fs');
var mongoose = require('mongoose'),
GroupProduct = mongoose.model('GroupProduct');

exports.create = function(req, res){
  var groupProduct = new GroupProduct(req.body);
  let filePath = req.file ? req.file.path : 'api/assets/photo_not_found.png'
  groupProduct.avatar = fs.readFileSync(filePath);
  groupProduct.save(function(err, user) {
    if (err)
      return res.send(500, err);
    return res.sendStatus(200);
  });
};

exports.show_all = function(req, res) {
  GroupProduct.find({}, function(err, groupProducts) {
    if (err)
      return res.send(500, err);
    return res.json(groupProducts);
  });
};

exports.show = function(req, res) {
  GroupProduct.findById(req.params.groupProductId).exec(function(err, groupProduct) {
    if(err) {
      res.send(500, err);
    } else {
      res.json(groupProduct);
    }
  });
};

exports.show_avatar = function(req, res) {
  GroupProduct.findById(req.params.groupProductId).select('+avatar').exec(function(err,groupProduct) {
      if (err) {
        res.send(500, err);
      } else if(!groupProduct) {
        res.send(404, 'Any Group Product was found with this id');
      } else {
        res.contentType('image/png');
        if(groupProduct.avatar)
          return res.send(groupProduct.avatar);
        return res.send(fs.readFileSync('api/assets/photo_not_found.png'));
      }
  });
};

exports.update = function(req, res) {
  var groupProduct = new GroupProduct(req.body);
  if(req.file)
    groupProduct.avatar = fs.readFileSync(req.file.path);
  GroupProduct.findOneAndUpdate({_id: req.params.groupProductId}, groupProduct, {new: true}, function(err, groupProduct) {
    if (err)
      return res.send(500, err);
    return res.json(groupProduct);
  });
};

exports.delete = function(req, res) {
  GroupProduct.findByIdAndRemove(req.params.groupProductId, function(err) {
    if(err) {
      res.send(500, err);
    } else {
      res.sendStatus(200);
    }
  });
};
