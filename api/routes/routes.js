'use strict';
var multer  = require('multer')
var upload = multer({ dest: '/tmp/'});

module.exports = function(app) {
  var user = require('../controllers/UserController');
  var groupProduct = require('../controllers/GroupProductController');

// AUTHENTHICATE
  app.route('/api/v1/current_user')
    .get(user.authorize, user.current_user)

  app.route('/api/v1/authenticate')
    .post(user.authenticate)

// USER
  app.route('/api/v1/users')
    .get(user.authorize, user.show_all)
    .post(user.authorize, user.create)

  app.route('/api/v1/users/:userId')
    .get(user.authorize, user.show)
    .delete(user.authorize, user.delete)

  app.route('/api/v1/users/:userId/avatar')
    .get(user.authorize, user.show_avatar)

//GROUP PRODUCT
  app.route('/api/v1/group_products')
    .get(user.authorize, groupProduct.show_all)
    .post(user.authorize, upload.single('avatar'), groupProduct.create)

  app.route('/api/v1/group_products/:groupProductId')
    .get(user.authorize, groupProduct.show)
    .delete(user.authorize, groupProduct.delete)

  app.route('/api/v1/group_products/:groupProductId/avatar')
    .get(user.authorize, groupProduct.show_avatar)

};
