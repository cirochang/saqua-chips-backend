'use strict';

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
    req.decoded = decoded;
    next();
  });
};

exports.current_user = function(req, res) {
  User.findOne({id: req.decoded.id}, function(err, user) {
    if (err)
      return res.send(500, err);
    return res.json(user);
  });
};

exports.create = function(req, res) {
  if(!req.body.passwordConf || req.body.password !== req.body.passwordConf)
    return res.status(400).send('Senha e a confirmação de senha são diferentes');
  var user = new User(req.body);
  bcrypt.hash(req.body.password, 5, function(err, bcryptedPassword) {
    user.password = bcryptedPassword;
    user.save(function(err, user) {
      if (err)
        return res.send(500, err);
      return res.json(user);
    });
  });
};

exports.show_all = function(req, res) {
  User.find({}, function(err, users) {
    if (err)
      return res.send(500, err);
    return res.json(users);
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
        return res.send(404, 'Any Group Product was found with this id');
      res.contentType('image/png');
      return res.send(user.avatar);
  });
};

exports.update = function(req, res) {
  User.findOneAndUpdate({_id: req.body.id}, req.body, {new: true}, function(err, user) {
    if (err)
      return res.send(err);
    return res.json(user);
  });
};

exports.delete = function(req, res) {
  User.remove(req.params.userId, function(err) {
    if(err)
      return res.send(500, err);
    return res.sendStatus(200);
  });
};
