'use strict';

var mongoose = require('mongoose'),
User = mongoose.model('User');

var jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

/*
exports.list_all_tasks = function(req, res) {
  Task.find({}, function(err, task) {
    if (err)
      res.send(err);
    res.json(task);
  });
};
*/

exports.authenticate = function(req, res){
  User.findOne({
    username: req.body.username
  }, function(err, user) {
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
    console.log(req.body.passwordConf)
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
/*
exports.create_a_task = function(req, res) {
  var new_task = new Task(req.body);
  new_task.save(function(err, task) {
    if (err)
      res.send(err);
    res.json(task);
  });
};

exports.read_a_task = function(req, res) {
  Task.findById(req.params.taskId, function(err, task) {
    if (err)
      res.send(err);
    res.json(task);
  });
};

exports.update_a_task = function(req, res) {
  Task.findOneAndUpdate({_id: req.params.taskId}, req.body, {new: true}, function(err, task) {
    if (err)
      res.send(err);
    res.json(task);
  });
};

exports.delete_a_task = function(req, res) {
  Task.remove({
    _id: req.params.taskId
  }, function(err, task) {
    if (err)
      res.send(err);
    res.json({ message: 'Task successfully deleted' });
  });
};
*/
