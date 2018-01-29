var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var roles = ['employee', 'manager', 'director', 'developer'];

var UserSchema = new Schema({
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  username: {
    type: String,
    unique: true,
    required: true,
    trim: true,
    index: true,
    lowercase: true
  },
  password: {
    type: String,
    required: true,
    select: false
  },
  role: {
    type: String,
    enum: roles,
    required: true
  },
  avatar: {
    type: Buffer,
    select: false
  }
},{
  timestamps: true
});

UserSchema.methods = {
  hasManagerAccess: function() {
    return  ['manager', 'director', 'developer'].indexOf(this.role) >= 0;
  },
  powerOverRoles: function() {
    return roles.slice(0 ,roles.indexOf(this.role) + 1);
  }
};

module.exports = mongoose.model('User', UserSchema);
