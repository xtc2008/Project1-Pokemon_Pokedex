const fetch = require('node-fetch');
const fs = require('fs');
const path = require('path');

const models = require('../models/pokemonModels.js');

const { convertToPhotoUrl } = require('../utils/helpers');

const { Pokemon } = models;

const pokemonController = {};

pokemonController.getPokemonData = async (req, res, next) => {
  for(let i = 387; i < 898; i++) {
    const [resultPokemon, resultSpecies] = await Promise.all([
      fetch(`https://pokeapi.co/api/v2/pokemon/${i}/`),
      fetch(`https://pokeapi.co/api/v2/pokemon-species/${i}/`)
    ])
    const data = await resultPokemon.json();
    const species = await resultSpecies.json();

    //const response = await fetch(resource[, options]);
    
    // async function fetchMoviesJSON() {
    //   const response = await fetch('/movies');
    //   const movies = await response.json();
    //   return movies;
    // }
    // fetchMoviesJSON().then(movies => {
    //   movies; // fetched movies
    // });

    if(species["evolves_from_species"] !== null) {
      let saved = species["evolves_from_species"].name;
      species["evolves_from_species"] = saved;
    }

    function titleCase(string){
      return string[0].toUpperCase() + string.slice(1).toLowerCase();
    }

    const pokemonSchema = {
      id: data.id.toString().padStart(3, "0"),
      name: titleCase(data.forms[0].name),
      height: `${(data.height / 10).toFixed(2)}m`,
      weight: `${(data.weight / 10).toFixed(2)}kg`,
      ...((data.abilities.length === 1) ? {abilities: [titleCase(data.abilities[0].ability.name)]} : {abilities: [titleCase(data.abilities[0].ability.name), titleCase(data.abilities[1].ability.name)]}),
      ...((data.types.length === 1) ? {types: [titleCase(data.types[0].type.name)]} : {types: [titleCase(data.types[0].type.name), titleCase(data.types[1].type.name)]}),
      static_sprite: data.sprites.other["official-artwork"]["front_default"],
      animated_sprite: data.sprites.versions["generation-v"]["black-white"]["animated"]["front_default"],
      hp: data.stats[0].base_stat,
      attack: data.stats[1].base_stat,
      defense: data.stats[2].base_stat,
      special_attack: data.stats[3].base_stat,
      special_defense: data.stats[4].base_stat,
      speed: data.stats[5].base_stat,
      caught: "No",
    };

    const speciesSchema = {
      entry: species["flavor_text_entries"][8]["flavor_text"],
      ...((species.habitat === null) ? {habitat: "Not Available"} : {habitat: titleCase(species.habitat.name)}), //no habitat after #386
      genderM: `${((8 - species["gender_rate"]) / 8 * 100).toFixed(2)}%`,
      genderF: `${(species["gender_rate"] / 8 * 100).toFixed(2)}%`,
      genera: species.genera[0].genus,
      ...((species["evolves_from_species"] !== null) ? {evolveFrom: species["evolves_from_species"]} : {evolveFrom: "Null"}),
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

//****Throw this into client side to download multiple pngs *****/
  // useEffect(() => {
  //   const getSprites = async () => {
  //     for(let i = 1; i < 900; i++) {
  //       let response = await fetch(`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${i}.png`)
  //       response = await response.blob()
  //       var url = window.URL.createObjectURL(response);
  //       var a = document.createElement('a');
  //       a.href = url;
  //       a.download = `${i}.png`;
  //       document.body.appendChild(a);
  //       a.click();
  //       a.remove();  //afterwards we remove the element again       
  //       console.log('pokemon sprite file saved', i);
  //     }
  //   }
  //   getSprites()
  // },[])

//****Throw this into client side to download multiple gifs *****/
  // useEffect(() => {
  //   const getGif = async () => {
  //     for(let i = 1; i < 900; i++) {
  //       let response = await fetch(`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-v/black-white/animated/${i}.gif`)
  //       response = await response.blob()
  //       var url = window.URL.createObjectURL(response);
  //       var a = document.createElement('a');
  //       a.href = url;
  //       a.download = `${i}.gif`;
  //       document.body.appendChild(a);
  //       a.click();
  //       a.remove();  //afterwards we remove the element again       
  //       console.log('pokemon animated gif saved', i);
  //     }
  //   }
  //   getGif()
  // },[])


// EXPORT THE CONTROLLER HERE
module.exports = pokemonController;
