'use strict';
var multer  = require('multer')
var upload = multer({ dest: '/tmp/'});

module.exports = function(app) {
  var user = require('../controllers/UserController');
  var groupProduct = require('../controllers/GroupProductController');
  var product = require('../controllers/Product');
// AUTHENTHICATE
  app.route('/api/v1/current_user')
    .get(user.authorize, user.current_user)

  app.route('/api/v1/authenticate')
    .post(user.authenticate)

// USER
  app.route('/api/v1/users')
    .get(user.authorize, user.show_all)
    .post(user.authorize, user.hasManagerAccess, user.create)

  app.route('/api/v1/users/:userId')
    .get(user.authorize, user.show)
    .delete(user.authorize, user.hasManagerAccess, user.delete)

  app.route('/api/v1/users/:userId/avatar')
    .get(user.authorize, user.show_avatar)

// PRODUCT
  app.route('/api/v1/products')
    .get(user.authorize, product.show_all)
    .post(user.authorize, user.hasManagerAccess, upload.single('avatar'), product.create)

  app.route('/api/v1/products/:productId')
    .get(user.authorize, product.show)
    .delete(user.authorize, user.hasManagerAccess, product.delete)

  app.route('/api/v1/products/:productId/avatar')
    .get(user.authorize, product.show_avatar)

//GROUP PRODUCT
  app.route('/api/v1/group_products')
    .get(user.authorize, groupProduct.show_all)
    .post(user.authorize, user.hasManagerAccess, upload.single('avatar'), groupProduct.create)

  app.route('/api/v1/group_products/:groupProductId')
    .get(user.authorize, groupProduct.show)
    .delete(user.authorize, user.hasManagerAccess, groupProduct.delete)

  app.route('/api/v1/group_products/:groupProductId/avatar')
    .get(user.authorize, groupProduct.show_avatar)

};
