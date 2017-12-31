var multer  = require('multer');
var upload = multer({ dest: (process.env.UPLOAD_PATH || '/tmp/') });

module.exports = function(app) {
  var user = require('../controllers/UserController');
  var groupProduct = require('../controllers/GroupProductController');
  var product = require('../controllers/ProductController');
  var demand = require('../controllers/DemandController');

// AUTHENTHICATE
  app.route('/api/v1/current_user')
    .get(user.authorize, user.current_user);

  app.route('/api/v1/authenticate')
    .post(user.authenticate);

// USER
  app.route('/api/v1/users')
    .get(user.authorize, user.show_all)
    .post(user.authorize, user.hasManagerAccess, upload.single('avatar'), user.create);

  app.route('/api/v1/users/:userId')
    .get(user.authorize, user.show)
    .put(user.authorize, user.hasManagerAccess, upload.single('avatar'), user.update)
    .delete(user.authorize, user.hasManagerAccess, user.delete);

  app.route('/api/v1/users/:userId/avatar')
    .get(user.show_avatar);

// DEMANDS
  app.route('/api/v1/demands')
    .get(user.authorize, demand.show_all)
    .post(user.authorize, user.hasManagerAccess, demand.create);

  app.route('/api/v1/demands/:demandId')
    .get(user.authorize, demand.show)
    .put(user.authorize, user.hasManagerAccess, demand.update);

// PRODUCT
  app.route('/api/v1/products')
    .get(user.authorize, product.show_all)
    .post(user.authorize, user.hasManagerAccess, upload.single('avatar'), product.create);

  app.route('/api/v1/products/:productId')
    .get(user.authorize, product.show)
    .put(user.authorize, user.hasManagerAccess, upload.single('avatar'), product.update)
    .delete(user.authorize, user.hasManagerAccess, product.delete);

  app.route('/api/v1/products/:productId/avatar')
    .get(product.show_avatar);

//GROUP PRODUCT
  app.route('/api/v1/group_products')
    .get(user.authorize, groupProduct.show_all)
    .post(user.authorize, user.hasManagerAccess, upload.single('avatar'), groupProduct.create);

  app.route('/api/v1/group_products/:groupProductId')
    .get(user.authorize, groupProduct.show)
    .put(user.authorize, user.hasManagerAccess, upload.single('avatar'), groupProduct.update)
    .delete(user.authorize, user.hasManagerAccess, groupProduct.delete);

  app.route('/api/v1/group_products/:groupProductId/avatar')
    .get(groupProduct.show_avatar);

};
