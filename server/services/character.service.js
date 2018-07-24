const Character = require('../db/models/character_schema');

const characterServices = {};

characterServices.getAll = getAll;
characterServices.getOne = getOne;
characterServices.updateOne = updateOne;

module.exports = characterServices;

function getAll() {
  return new Promise((resolve, reject) => {
    resolve(Character.query().select('id','name','race'));
  })
  .then(characters => {
    if (characters.length === 0) {
      throw new Error('No characters found!');
    }
    return characters;
  })
  .catch(err => {
    return err;
  }); 
}

function getOne(id) {
  console.log('getting character');
  return new Promise((resolve, reject) => {
    resolve(Character.query().findById(id))
  })
  .then(character => {
    if (!character) {
      throw new Error('No character found');
    }
   return Promise.all([
      Promise.resolve(character), character.$relatedQuery('skills').orderBy('name'),
      character.$relatedQuery('weapons').orderBy('name'),
      character.$relatedQuery('spells').orderBy('diety'),
      character.$relatedQuery('saves').orderBy('name'),
      character.$relatedQuery('notes').orderBy('time')
    ]);
  })
  .then(character => {
    return character[0];
  })
  .catch(err => {
    return err;
  })
}

function updateOne(id, body) {
  Character.findById(id)
    .then(character => {
      if (character) {
        // run update
      } else {
        // run insert
      }
    })
    .catch(err => {
      return err;
    })
}