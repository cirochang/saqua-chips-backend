var fs = require('fs');
var mongoose = require('mongoose'),
User = mongoose.model('User');

var jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

exports.authenticate = function(req, res){
  User.findOne({
    username: req.body.username
  }).select('+password').exec(function(err, user) {
    if (err)
      throw err;
    if (!user)
      return res.status(401).send('Falha na autenticação, verifique seu login e senha');
    bcrypt.compare(req.body.password, user.password, function(err, doesMatch){
      if (!doesMatch)
        return res.status(401).send('Falha na autenticação, verifique seu login e senha');
      return res.json({
        success: true,
        message: 'Token generated',
        token: jwt.sign({username: user.username}, req.app.get('superSecret'), {
          expiresIn: '24h' // expires in 24 hours
        })
      });
    });
  });
};

exports.hasManagerAccess = function(req, res, next) {
  User.findOne({username: req.decoded.username}, function(err, user) {
    if (err)
      return res.send(500, err);
    if (!user.hasManagerAccess())
      return res.send(401, 'Your User cant access this endpoint.');
    next();
  });
};

exports.authorize = function(req, res, next) {
  var token = req.body.token || req.query.token || req.headers['x-access-token'];
  if (!token)
    return res.status(403).send({
        success: false,
        message: 'No token provided.'
    });
  jwt.verify(token, req.app.get('superSecret'), function(err, decoded) {
    if (err)
      return res.status(401).send({
          success: false,
          message: 'Failed to authenticate token.'
      });
    console.log(decoded);
    req.decoded = decoded;
    next();
  });
};

exports.current_user = function(req, res) {
  User.findOne({username: req.decoded.username}, function(err, user) {
    if (err)
      return res.send(500, err);
    return res.json(user);
  });
};

exports.create = function(req, res) {
  var user = new User(req.body);
  var error = user.validateSync();
  if(error && error.errors)
    return res.send(400, error.errors);
  if(!req.body.passwordConf || req.body.password !== req.body.passwordConf)
    return res.status(400).send('Senha e a confirmação de senha são diferentes');
  bcrypt.hash(req.body.password, 5, function(err, bcryptedPassword) {
    user.password = bcryptedPassword;
    let filePath = req.file ? req.file.path : 'api/assets/photo_not_found.png'
    user.avatar = fs.readFileSync(filePath);
    user.save(function(err, user) {
      if (err)
        return res.send(500, err);
      return res.json(user);
    });
  });
};

exports.show_all = function(req, res) {
  User.findOne({username: req.decoded.username}, function(err, currentUser) {
    if (err)
      return res.send(500, err);
    User.find({role:  { $in: currentUser.powerOverRoles() }}, function(err, users) {
      if (err)
        return res.send(500, err);
      return res.json(users);
    });
  });
};

exports.show = function(req, res) {
  User.findById(req.params.userId, function(err, user) {
    if(err)
      return res.send(500, err);
    return res.json(user);
  });
};

exports.show_avatar = function(req, res) {
  User.findById(req.params.userId).select('+avatar').exec(function(err, user) {
      if (err)
        return res.send(500, err);
      if(!user)
        return res.send(404, 'Any User was found with this id');
      res.contentType('image/jpg');
      if(user.avatar)
        return res.send(user.avatar);
      return res.send(fs.readFileSync('api/assets/photo_not_found.png'));
  });
};

exports.update = function(req, res) {
  var user = new User(req.body);
  var error = user.validateSync();
  if(error && error.errors)
    return res.send(400, error.errors);
  if(!req.body.passwordConf || req.body.password !== req.body.passwordConf)
    return res.status(400).send('Senha e a confirmação de senha são diferentes');
  bcrypt.hash(req.body.password, 5, function(err, bcryptedPassword) {
    user.password = bcryptedPassword;
    if(req.file)
      user.avatar = fs.readFileSync(req.file.path);
    User.findOneAndUpdate({_id: req.params.userId}, user, {new: true}, function(err, user) {
      if (err)
        return res.send(err);
      return res.json(user);
    });
  });
};

exports.delete = function(req, res) {
  User.findByIdAndRemove(req.params.userId, function(err) {
    if(err)
      return res.send(500, err);
    return res.sendStatus(200);
  });
};
