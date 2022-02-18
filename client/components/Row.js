import React from 'react';
import PokemonBox from './PokemonBox';
import { useState} from 'react'

const Row = () => {
  const [fetchedPokemon, setFetchedPokemon] = useState(false);
  const [pokemonList, setPokemonList] = useState([])
  

  React.useEffect(function effectFunction() {
    async function fetchedPokemon() {
      const response = await Pokemon.find({});
      const pokemonData = await response.json();
      setPokemonList(pokemonData);
      setFetchedPokemon(true);
      console.log(pokemonData)
    }
    fetchedPokemon();
  }, []);

  const squareElements = pokemonList.map((pokemon,i) => (
    <PokemonBox 
      key={i} 
      info={pokemon} 
    />
  ));

  return (
    <div className="row">
      {squareElements}
    </div>
  );
};

export default Row;
