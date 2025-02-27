import React, { useState, useEffect } from 'react';
import { render } from 'react-dom';
import axios from 'axios';

import Favorites from './components/Favorites.js';
import Board from './components/Board.js';

const App = () => {
  const [addRestaurant, setNewRestaurant] = useState({
    location: '',
  });
  const [threeOptions, setOptions] = useState([]);
  const [allFavorites, setFavorite] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:3000/api/favorites').then((res) => {
      setFavorite(res.data);
    });
  }, []);

  const onChangeHandler = (event) => {
    setNewRestaurant({
      [event.target.id]: event.target.value,
    });
  };

  const addFavorites = (event) => {
    setFavorite({
      [event.target.id]: event.target.value,
    });
  };

  const handleSearchLocation = (newSearch) => {
    axios.post('http://localhost:3000/api/search', newSearch).then((res) => {
      setOptions(res.data);
    });
  };

  const handleAddToFavorites = (restObj) => {
    axios.post('http://localhost:3000/api/add', restObj).then((res) => {
      console.log(res);
    });
  };

  const handleDeleteFavorite = (id) => {
    axios
      .delete(`http://localhost:3000/api/delete/${id}`)
      .then((res) => console.log(res))
      .then(
        axios.get('http://localhost:3000/api/favorites').then((res) => {
          setFavorite(res.data);
        })
      );
  };

  if (threeOptions.length === 0) {
    return (
      <div>
        <div>
          <form>
            <input
              id='location'
              key='location'
              onChange={onChangeHandler}
              value={addRestaurant.location}
              placeholder='Search by location'
            />
          </form>
          <button
            className='search'
            onClick={() => {
              handleSearchLocation(addRestaurant);
            }}
          >
            Search
          </button>
        </div>
        <div>
          <div className='searchResults'>
            <Board searchResults={threeOptions} />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div>
        <form>
          <input
            id='location'
            key='location'
            onChange={onChangeHandler}
            value={addRestaurant.location}
            placeholder='Search by location'
          />
        </form>
        <button
          className='search'
          onClick={() => {
            handleSearchLocation(addRestaurant);
          }}
        >
          Again?
        </button>
      </div>
      <div className='favoritiesList'>
        <Favorites deleteFavorite={handleDeleteFavorite} />
      </div>
      <div>
        <div className='searchResults'>
          <Board
            searchResults={threeOptions}
            addToFavorites={handleAddToFavorites}
          />
        </div>
      </div>
    </div>
  );
};

export default App;
