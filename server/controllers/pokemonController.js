const fetch = require('node-fetch');

const models = require('../models/pokemonModels.js');

const { convertToPhotoUrl } = require('../utils/helpers');

const { Pokemon } = models;

const pokemonController = {};

pokemonController.getPokemon = async (req, res, next) => {
  for(let i = 1; i < 152; i++) {
    const [resultPokemon, resultSpecies] = await Promise.all([
      fetch(`https://pokeapi.co/api/v2/pokemon/${i}/`),
      fetch(`https://pokeapi.co/api/v2/pokemon-species/${i}/`)
    ])
    const data = await resultPokemon.json();
    const species = await resultSpecies.json();

    if(species["evolves_from_species"] !== null) {
      let saved = species["evolves_from_species"].name;
      species["evolves_from_species"] = saved;
    }

    let typeArr;

    if(data.types.length === 1) {
      typeArr = [data.types[0].type.name];
    } else {
      typeArr = [data.types[0].type.name, data.types[1].type.name];
    }

    let abilityArr;

    if(data.abilities.length === 1) {
      abilityArr = [data.abilities[0].ability.name];
    } else {
      abilityArr = [data.abilities[0].ability.name, data.abilities[1].ability.name];
    }

    function titleCase(string){
      return string[0].toUpperCase() + string.slice(1).toLowerCase();
    }

    const pokemonSchema = {
      id: data.id.toString().padStart(3, "0"),
      name: titleCase(data.forms[0].name),
      height: `${(data.height / 10).toFixed(2)}m`,
      weight: `${(data.weight / 10).toFixed(2)}kg`,
      abilities: abilityArr,
      types: typeArr,
      static_sprite: data.sprites.other["official-artwork"]["front_default"],
      animated_sprite: data.sprites.versions["generation-v"]["black-white"]["animated"]["front_default"],
      hp: data.stats[0].base_stat,
      attack: data.stats[1].base_stat,
      defense: data.stats[2].base_stat,
      special_attack: data.stats[3].base_stat,
      special_defense: data.stats[4].base_stat,
      speed: data.stats[5].base_stat,
      caught: "no",
    };

  
    const speciesSchema = {
      entry: species["flavor_text_entries"][8]["flavor_text"],
      habitat: species.habitat.name,
      genderM: `${((8 - species["gender_rate"]) / 8 * 100).toFixed(2)}%`,
      genderF: `${(species["gender_rate"] / 8 * 100).toFixed(2)}%`,
      genera: species.genera[0].genus,
      evolveFrom: species["evolves_from_species"],
    };

    res.locals.pokemonPart1 = pokemonSchema;
    res.locals.pokemonPart2 = speciesSchema;

    res.locals.pokemon = {
      ...res.locals.pokemonPart1,
      ...res.locals.pokemonPart2
    }

    await Pokemon.create(res.locals.pokemon) //create to database
    console.log('pokemon added to database', i);
  }
  return next();
  // catch (err){
  //   return next({
  //     log: `pokemonController.getPokemon: ERROR: ${typeof err === 'object' ? JSON.stringify(err) : err}`,
  //     message: { err: 'pokemonController.getPokemon: ERROR: Check server logs for details' },
  //   });
  // }
};


// EXPORT THE CONTROLLER HERE
module.exports = pokemonController;
