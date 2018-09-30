const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const userSchema = new Schema({
  
  username: {type: String ,require:true},
  name: {type: String ,require:true},
  lastname: {type: String ,require:true},
  password: {type: String ,require:true},
  email: {type: String ,require:true,unique:true},
  role: {type: String},
  category: {type:String ,enum: ["11-15 años Portugal", "16-22 años Portugal", "11-22 años España"], default:"11-22 años España"}
 

}, {
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  }
});

const User = mongoose.model('User', userSchema);


  
  const Admin= new User({ username:"Admin",name:"Admin",lastname:"Admin",password:"$2b$10$db8eY/bLiedAuN.xzPLxkuzFCFCx3Udfy8uKXd59rDP/ZDytOykVC",email:"prueba@email.com",role:"admin"});
  Admin.save().then(() => console.log('creado'));
  

    
module.exports = User;