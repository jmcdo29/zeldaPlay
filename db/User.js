import { mongoose } from "mongoose";
import { bcrypt } from "bcryptjs";

let userSchema = mongoose.Schema({
  email: {
    type: String,
    unique: true,
    index: true
  },
  password:{
    type: String
  }
});

let User = module.exports = mongoose.model('User', userSchema);

module.exports.newUser = (newUser, callback)=>{
  newUser.save(callback);
};

module.exports.getUser = (userName, callback)=>{
  let query = {email: userName};
  User.findOne(query, callback).catch(()=>{
    console.log('Error: No user found with username',userName);
  });
};