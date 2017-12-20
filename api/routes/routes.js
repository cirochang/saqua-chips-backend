'use strict';
var multer  = require('multer')
var upload = multer({ dest: '/tmp/'});

module.exports = function(app) {
  var user = require('../controllers/UserController');
  var groupProduct = require('../controllers/GroupProductController');

  app.route('/api/v1/users')
    .get(user.authorize, user.show_users)
    .post(user.create)

  app.route('/api/v1/current_user')
    .get(user.authorize, user.current_user)

  app.route('/api/v1/authenticate')
    .post(user.authenticate)

  app.route('/api/v1/group_products')
    .get(user.authorize, groupProduct.show_groupProducts)
    .post(user.authorize, upload.single('avatar'), groupProduct.create)

  app.route('/api/v1/group_products/:groupProductId/avatar')
    .get(user.authorize, groupProduct.show_avatar)
};
