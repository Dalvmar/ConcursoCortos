const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const userSchema = new Schema({
  
  username: {type: String ,require:true},
  name: {type: String ,require:true},
  lastname: {type: String ,require:true},
  password: {type: String ,require:true},
  email: {type: String ,require:true},
  role: {type: String, enum: ["user","admin"],default: "user"},
  category: {type:String ,enum: [ "11 y 15 años nacidos en Portugal","16 y 22 años nacidos en Portugal","11 y 22 años nacidos en España" ]}

}, {
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  }
});

const User = mongoose.model('User', userSchema);
module.exports = User;