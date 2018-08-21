const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const userSchema = new Schema({
  
  username: {type: String ,require:true},
  name: {type: String ,require:true},
  lastname: {type: String ,require:true},
  password: {type: String ,require:true},
  email: {type: String ,require:true},
  role: {type: String, enum: ["user", "admin"],default: "user"},
  category: {type:String ,enum: ["11-15 años Portugal", "16-22 años Portugal", "11-22 años España"], default:"11-22 años España"}

}, {
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  }
});

const User = mongoose.model('User', userSchema);
module.exports = User;