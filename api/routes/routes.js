'use strict';
module.exports = function(app) {
  var user = require('../controllers/UserController');

  app.route('/api/v1/users')
    .get(user.authorize, user.show_users)
    .post(user.create)

  app.route('/api/v1/current_user')
    .get(user.authorize, user.current_user)

  app.route('/api/v1/authenticate')
    .post(user.authenticate)

/*
  app.route('/tasks/:taskId')
    .get(todoList.read_a_task)
    .put(todoList.update_a_task)
    .delete(todoList.delete_a_task);
*/
};
