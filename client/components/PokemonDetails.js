import React from 'react';
import FastAverageColor from 'fast-average-color';
import PropTypes from 'prop-types';
import stats from '../../public/assets/stats.png';
import weakness from '../../public/assets/weakness.png';
import male from '../../public/assets/male.png';
import female from '../../public/assets/female.png';
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


const PokemonDetails = ({currentPokemon}) => {
  
  const {
    id, name, height, weight, abilities, types, static_sprite,
    animated_sprite, hp, attack, defense, special_attack, 
    special_defense, speed, caught, entry, habitat, genderM, genderF,
    genera, evolveFrom
  } = currentPokemon;

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


  // const fac = new FastAverageColor();
  // fac.getColorAsync(document.getElementById('main_img'))
  //   .then(color => {
  //     document.querySelector('body').style.backgroundColor = color.rgb;
  //   })
  //   .catch(e => {
  //       console.log(e);
  // });

  return (
    <div className="pokemon-detail-wrapper">
      <div className="pokemon-detail-top">
        <img id="main_img" crossorigin="anonymous" className="pokemon-detail-image" src={static_sprite}/>
        <p className="pokemon-detail-number">#{id}</p>
        <p className="pokemon-detail-name">{name}</p>
        <section className='pokemon-detail-type'>
          <img src={type1} className="pokemon-detail-type"/>
          <img src={type2} className="pokemon-detail-type"/>
        </section>
      </div>
      <div className="pokemon-detail-entry">
        <p className="pokemon-detail-entry-dex">Pokédex Entry</p>
        <p className="pokemon-detail-entry-number">{entry}</p>
      </div>
        <p className="pokemon-detail-data-text">Pokemon Data</p>
      <div className="pokemon-detail-data-container">
        <div className="pokemon-detail-data-left">
          <div className="pokemon-detail-data-left1">
            <ul className="pokemon-detail-data-left1-desc">
              <li>Habitat</li>
              <li>Height</li>
              <li>Weight</li>
              <li>Abilities</li>
              <li>Types</li>
              <li>Evolved From</li>
            </ul>
          </div>
          <div className="pokemon-detail-data-left2-inputs">
            <ul className="pokemon-detail-data">
              <li>{habitat}</li>
              <li>{height}</li>
              <li>{weight}</li>
              <li>{abilities[0]} {abilities[1]}</li>
              <li>{types[0]} {types[1]}</li>
              <li>{evolveFrom}</li>
            </ul>
          </div>
        </div>
        <div className="pokemon-detail-data-right">
          <p className="pokemon-detail-weakness">Weakness</p>
          <img className="pokemon-detail-weakness-template" src={weakness}/>
          <p className="pokemon-detail-stats">Stats</p>
          <img className="pokemon-detail-stats-template" src={stats}/>
          <ul className="pokemon-detail-stats-numbers">
              <li>{hp}</li>
              <li>{attack}</li>
              <li>{defense}</li>
              <li>{special_attack}</li>
              <li>{special_defense}</li>
              <li>{speed}</li>
          </ul>
          <p className="pokemon-detail-gender">Gender Ratio</p>
          <section className="pokemon-detail-genderRatio">
            <img className="pokemon-detail-genderMale-image" src={male}/>
            <p className="pokemon-detail-genderMale-text">{genderM}</p>
            <p className="pokemon-detail-genderFemale-text">{genderF}</p>
            <img className="pokemon-detail-genderFemale-image" src={female}/>
          </section>
        </div>
      </div>
    </div>
  );
};

// PokemonDetails.propTypes = {
//   gameList: PropTypes.array.isRequired,
// };

export default PokemonDetails;
