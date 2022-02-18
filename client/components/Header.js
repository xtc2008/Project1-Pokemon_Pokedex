import React, { Component } from 'react';
import fetch from 'isomorphic-fetch';
import logo from '../assets/Logo2.png';
import pokeball from '../assets/Pokeball.png';

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      leaders: null
    };
  }
  
  componentDidMount() {
    // uncomment the below for proxy challenge
  }
  render() {
    // if (!this.state.leaders) return null;
    // const leaderNames = this.state.leaders.map(leader => <li key={leader.id}>{leader.name}</li>);
    return (
      <div className='app-head'>
        <div className="logo">
          <img src={logo} className="pokemon-header"/>
        </div>
        <div className='searchBar'>
          <input id="search" type="search" placeholder="   Search your favorite Pokemon..." autoFocus required />
          <button type="submit" src={pokeball}>
            <img src={pokeball} width="40" height="40" alt="submit" />
          </button>    
        </div>
      </div>
    );
  }
}

export default Header;
