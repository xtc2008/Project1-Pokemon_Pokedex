import React from 'react';
import PropTypes from 'prop-types';
import captured from '../../public/assets/captured.png';
import uncaught from '../../public/assets/uncaught.png';
import normal from '../../public/assets/normal.png';
import fighting from '../../public/assets/fighting.png';
import flying from '../../public/assets/flying.png';
import poison from '../../public/assets/poison.png';
import ground from '../../public/assets/ground.png';
import rock from '../../public/assets/rock.png';
import bug from '../../public/assets/bug.png';
import ghost from '../../public/assets/ghost.png';
import steel from '../../public/assets/steel.png';
import fire from '../../public/assets/fire.png';
import water from '../../public/assets/water.png';
import grass from '../../public/assets/grass.png';
import electric from '../../public/assets/electric.png';
import psychic from '../../public/assets/psychic.png';
import ice from '../../public/assets/ice.png';
import dragon from '../../public/assets/dragon.png';
import dark from '../../public/assets/dark.png';
import fairy from '../../public/assets/fairy.png';

const PokemonBox = ({pokemon, handleClick}) => {

  const {
    id, name, height, weight, abilities, types, static_sprite,
    animated_sprite, hp, attack, defense, special_attack, 
    special_defense, speed, caught, entry, habitat, genderM, genderF,
    genera, evolveFrom
  } = pokemon;

  let type1;
  const expr1 = types[0];
  switch (expr1) {
    case 'grass':
      type1 = grass;
      break;
    case 'poison':
      type1 = poison;
      break;
    case 'fire':
      type1 = fire;
      break;
    case 'flying':
      type1 = flying;
      break;
    case 'bug':
      type1 = bug;
      break;
    case 'normal':
      type1 = normal;
      break;
    case 'fairy':
      type1 = fairy;
      break;
    case 'water':
      type1 = water;
      break;
    case 'rock':
      type1 = rock;
      break;
    case 'ground':
      type1 = ground;
      break;
    case 'ice':
      type1 = ice;
      break;
    case 'psychic':
      type1 = psychic;
      break;
    case 'dragon':
      type1 = dragon;
      break;
    case 'electric':
      type1 = electric;
      break;
    case 'steel':
      type1 = steel;
      break;
    case 'ghost':
      type1 = ghost;
      break;
    case 'fighting':
      type1 = fighting;
      break;
    case 'dark':
      type1 = dark;
      break;
}

let type2;
const expr2 = types[1];
switch (expr2) {
  case 'grass':
    type2 = grass;
    break;
  case 'poison':
    type2 = poison;
    break;
  case 'fire':
    type2 = fire;
    break;
  case 'flying':
    type2 = flying;
    break;
  case 'bug':
    type2 = bug;
    break;
  case 'normal':
    type2 = normal;
    break;
  case 'fairy':
    type2 = fairy;
    break;
  case 'water':
    type2 = water;
    break;
  case 'rock':
    type2 = rock;
    break;
  case 'ground':
    type2 = ground;
    break;
  case 'ice':
    type2 = ice;
    break;
  case 'psychic':
    type2 = psychic;
    break;
  case 'dragon':
    type2 = dragon;
    break;
  case 'electric':
    type2 = electric;
    break;
  case 'steel':
    type2 = steel;
    break;
  case 'ghost':
    type2 = ghost;
    break;
  case 'fighting':
    type2 = fighting;
    break;
  case 'dark':
    type2 = dark;
    break;
}

let isCaptured;
const expr3 = caught;
switch (expr3) {
  case 'yes':
    isCaptured = captured;
    break;
  case 'no':
    isCaptured = uncaught;
    break;
}

  return (
    <div onClick={() => handleClick(pokemon)} className="pokemon-box-wrapper">
      <div className="pokemon-box-animate">
      <img className="pokemon-box-image" src={`http://localhost:3000/static/animated/${id * 1}.gif`}></img>
      </div>
      <div className="pokemon-box-top">
        <section className="pokemon-box-top-left">
          <span className="pokemon-box-number">#{id}</span>
        </section>
        <section className="pokemon-box-top-right">
          <span className="pokemon-box-japanese">{genera}</span>
        </section>
      </div>
      <div className="pokemon-box-mid">
        <div className='pokemon-box-mid-left'>
          <p className="pokemon-box-name">{name}</p>
          <section className='pokemon-box-mid-left1'>
            <img src={type1} className="pokemon-box-type"/>
            <img src={type2} className="pokemon-box-type"></img>
          </section>
        </div>
        <div className='pokemon-box-mid-right'>
          <section className='pokemon-box-mid-right1'>
            <img src={captured} className="pokemon-box-captured"></img>
          </section>
        </div>
      </div>
      <div className="pokemon-box-bot">
        <section className="pokemon-box-bot-1">
          <span className="pokemon-box-WeightInput">{weight}</span>
          <span className="pokemon-box-Weight">Weight</span>
        </section>
        <section className="pokemon-box-bot-2">
          <span className="pokemon-box-TypeInput">{types[0]} {types[1]}</span>
          <span className="pokemon-box-Type">Type</span>
        </section>
        <section className="pokemon-box-bot-3">
          <span className="pokemon-box-HeightInput">{height}</span>
          <span className="pokemon-box-Height">Height</span>
        </section>
      </div>
    </div>
  );
};

export default PokemonBox;
