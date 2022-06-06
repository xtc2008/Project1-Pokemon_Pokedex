import React, { useState , useEffect } from 'react';
import PokemonBox from './PokemonBox';
import PokemonDetails from './PokemonDetails';
import Header from './Header';

const App = () => {
  const [fetchedPokemon, setFetchedPokemon] = useState(false);
  const [pokemonList, setPokemonList] = useState([]);
  const [currentPokemon, setCurrentPokemon] = useState({
      id:"151",
      name:"Mew",
      height:"0.40m",
      weight:"4.00kg",
      abilities:[
      "pressure",
      "unnerve"
      ],
      types:[
      "dragon",
      "flying"
      ],
      static_sprite:"https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/151.png",
      animated_sprite:"https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-v/black-white/animated/151.gif",
      hp:100,
      attack:100,
      defense:100,
      special_attack:100,
      special_defense:100,
      speed:100,
      caught:"no",
      entry:"A MEW is said to possess the genes of all\nPOKéMON. It is capable of making itself\ninvisible at will, so it entirely avoids\nnotice even if it approaches people.",
      habitat:"rare",
      genderM:"112.50%",
      genderF:"-12.50%",
      genera:"しんしゅポケモン",
      evolveFrom:null
  });

  useEffect(function effectFunction() {
    fetch('/getpokemon')
    .then(response => response.json())
    .then(pokemonData => {
      setPokemonList(pokemonData);
      setFetchedPokemon(true);
    });
  }, []);

  const handleClick = (pokemon) => {
    console.log(pokemon)
    setCurrentPokemon(pokemon);
  }

  const rowElements = pokemonList.map((pokemon,i) => (
    <PokemonBox 
      key={i+1} 
      pokemon={pokemon} 
      handleClick={handleClick}
    />
  ));

  return (
    <div className='app'>
      <Header/>
      <div className="app-body">
        <div id="board">
          {rowElements}
        </div>
        <PokemonDetails
          currentPokemon={currentPokemon}
        />
      </div>
    </div>
  );
}

export default App;
