exports.create_default_admin = function(){

  var mongoose = require('mongoose'),
  User = mongoose.model('User');
  User.find({}, function(err, users) {
    if (err)
      throw err;
    if (users.length <= 0){
      console.log('The database does not have any users, a default user will be created...');
      var user = new User({
        firstName: 'admin',
        lastName: 'admin',
        username: 'admin',
        role: 'developer',
      });
      const bcrypt = require('bcrypt');
      bcrypt.hash('admin', 5, function(err, bcryptedPassword) {
        user.password = bcryptedPassword;
        user.save(function(err, user) {
          if (err){
            console.error(err);
          }else{
            console.log('Default user created sucessfully!');
          }
        })
      });
    }else{
      console.log('skipping (create_default_admin)...')
    }
  })

};
