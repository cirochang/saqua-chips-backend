var fs = require('fs');
var mongoose = require('mongoose'),
Product = mongoose.model('Product');

exports.create = function(req, res){
  var product = new Product(req.body);
  product.status = 'pending';
  if(req.file)
    product.avatar = fs.readFileSync(req.file.path);
  product.save(function(err, product) {
    if (err)
      return res.send(500, err);
    return res.sendStatus(200);
  });
};

exports.show_all = function(req, res) {
  Product.apiQuery(req.query).populate({path: 'groupProduct', model: 'GroupProduct'}).exec(function(err, products) {
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
  var product = new Product(req.body);
  if(req.file)
    product.avatar = fs.readFileSync(req.file.path);
  Product.findOneAndUpdate({_id: req.params.productId}, product, {new: true}, function(err, product) {
    if (err)
      return res.send(500, err);
    return res.json(product);
  });
};

exports.delete = function(req, res) {
  Product.findByIdAndRemove(req.params.productId, function(err) {
    if(err)
      return res.send(500, err);
    return res.sendStatus(200);
  });
};
