import { mongoose } from 'mongoose';

let charcaterSchema = mongoose.Schema({
  name:{
    type: String,
    index: true
  },
  atributes:[{
    name: String,
    value: Number,
    modifier: Number
  }],
  health: {
    type: Number
  },
  magic:{
    type: Number
  },
  exp:{
    type: Number
  },
  skills:[{
    skillName: String,
    ranks: Number,
    trained: Boolean,
    modifier: String,
    item: Number,
    racial: Number,
    misc: Number
  }],
  weaponSkills:[{
    skillName: String,
    ranks: Number,
    trained: Boolean,
    racial: Number
  }],
  magicSkills:[{
    skillName: String,
    modifier: String,
    ranks: Number
  }],
  userId:{
    type: String,
    index: true
  }
});

let Character = module.exports = mongoose.model('Character', charcaterSchema);

module.exports.newCharacter = (newCharacter, callback)=>{
  newCharacter.save(callback);
};

module.exports.getCharacters = (userId, callback)=>{
  let query = {userId: userId};
  Character.find(query, callback);
};