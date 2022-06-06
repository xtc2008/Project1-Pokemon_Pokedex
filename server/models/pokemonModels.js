const mongoose = require('mongoose');

const MONGO_URI = 'mongodb+srv://xtc2008:codesmith@cluster0.ql6qs.mongodb.net/?retryWrites=true&w=majority';

mongoose.connect(MONGO_URI, {
  // options for the connect method to parse the URI
  useNewUrlParser: true,
  useUnifiedTopology: true,
  // sets the name of the DB that our collections are part of
  dbName: 'pokemon'
})
  .then(() => console.log('Connected to Mongo DB.'))
  .catch(err => console.log(err));

const Schema = mongoose.Schema;

// sets a schema for the 'Pokemon' collection from
//pokeapi.co/api/v2/pokemon-species & https://pokeapi.co/api/v2/pokemon

const pokemonSchema = new Schema({
  id: String,
  name: String,
  height: String,
  weight: String,
  abilities: [String],
  types: [String],
  static_sprite: String,
  animated_sprite: String,
  hp: Number,
  attack: Number,
  defense: Number,
  special_attack: Number,
  special_defense: Number,
  speed: Number,
  caught: String,
  entry: String,
  habitat: String,
  genderM: String,
  genderF: String,
  genera: String,
  evolveFrom: String, //mongoose.Mixed for mixed datatypes
});


// TODO: create a schema for 'person' and use it to create the model for it below
const Pokemon = mongoose.model('pokemon', pokemonSchema);


// exports all the models in an object to be used in the controller
module.exports = { Pokemon };
