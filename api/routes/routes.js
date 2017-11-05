'use strict';
module.exports = function(app) {
  var user = require('../controllers/UserController');

  // todoList Routes
  /*
  app.route('/api/tasks')
    .get(todoList.list_all_tasks)
    .post(todoList.create_a_task)
*/
  app.route('/api/v1/user')
    .post(user.create)

  app.route('/api/v1/authenticate')
    .post(user.authenticate)

/*
  app.route('/tasks/:taskId')
    .get(todoList.read_a_task)
    .put(todoList.update_a_task)
    .delete(todoList.delete_a_task);
*/
};
