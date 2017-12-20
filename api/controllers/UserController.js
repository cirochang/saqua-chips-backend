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
    if(!user)
      res.status(401).send('Falha na autenticação, verifique seu login e senha');
    else{
      bcrypt.compare(req.body.password, user.password, function(err, doesMatch){
        if (!doesMatch)
          res.status(401).send('Falha na autenticação, verifique seu login e senha');
        else{
          res.json({
            success: true,
            message: 'Token generated',
            token: jwt.sign({username: user.username}, req.app.get('superSecret'), {
              expiresIn: '24h' // expires in 24 hours
            })
          });
        }
      });
    }
  })
}

exports.create = function(req, res){
  if(!req.body.passwordConf || req.body.password !== req.body.passwordConf){
    res.status(400).send('Senha e a confirmação de senha são diferentes');
  }
  else{
    var user = new User(req.body);
    bcrypt.hash(req.body.password, 5, function(err, bcryptedPassword) {
      user.password = bcryptedPassword;
      user.save(function(err, user) {
        if (err)
          res.send(err);
        res.json(user);
      })
    });
  }
}

exports.current_user = function(req, res) {
  User.findOne({
    id: req.decoded.id
  }, function(err, user) {
    if (err)
      res.send(err);
    res.json(user);
  });
};

exports.show_users = function(req, res) {
  User.find({}, function(err, users) {
    if (err)
      res.send(err);
    res.json(users);
  });
};

exports.authorize = function(req, res, next) {
  var token = req.body.token || req.query.token || req.headers['x-access-token'];
  if (token) {
    // verifies secret and checks exp
    jwt.verify(token, req.app.get('superSecret'), function(err, decoded) {
      if (err) {
        return res.json({ success: false, message: 'Failed to authenticate token.' });
      } else {
        // if everything is good, save to request for use in other routes
        req.decoded = decoded;
        next();
      }
    });
  } else {
    // if there is no token
    // return an error
    return res.status(403).send({
        success: false,
        message: 'No token provided.'
    });
  }
}

exports.update_user = function(req, res) {
  User.findOneAndUpdate({_id: req.body.id}, req.body, {new: true}, function(err, task) {
    if (err)
      res.send(err);
    res.sendStatus(200);
  });
};

exports.delete_user = function(req, res) {
  User.remove({
    _id: req.params.taskId
  }, function(err, task) {
    if (err)
      res.send(err);
    res.json({ message: 'Task successfully deleted' });
  });
};
