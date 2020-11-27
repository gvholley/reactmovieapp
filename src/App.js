import React, { useState, useEffect } from 'react';
import MovieList from './components/MovieList';
import MovieListHeading from './components/MovieListHeading';
import SearchBox from './components/SearchBox';
import AddFavorites from './components/AddFavorites';
import RemoveFavorites from './components/RemoveFavorites';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';


const App = () => {
  const [movies, setMovies] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [searchValue, setSearchValue] = useState('');

//Moved useEffect here from search
  useEffect(() => {
    const getMovieRequest = async (searchValue) => {
    const url = `http://www.omdbapi.com/?s=${searchValue}&apikey=c5171cf5`
    const response = await fetch(url);
    const responseJson = await response.json();

    if(responseJson.Search) {
      setMovies(responseJson.Search);
    }
  };
    getMovieRequest(searchValue);
  }, [searchValue]);


  useEffect(()=> {

      const movieFavorites = JSON.parse(
        localStorage.getItem('app-favorites')
        );
      if (movieFavorites) {
        setFavorites(movieFavorites);
      }
  }, []);


  const saveToLocalStorage = (items) => {
    localStorage.setItem('app-favorites', JSON.stringify(items));
  };

  const addFavoriteMovie = (movie) => {
    const newFavoriteList = [...favorites, movie];
    setFavorites(newFavoriteList);
    saveToLocalStorage(newFavoriteList);
  };


  const removeFavoriteMovie = (movie) => {
    const newFavoriteList = favorites.filter(
      (favorite) => favorite.imdbID !== movie.imdbID
      );


    setFavorites(newFavoriteList);
    saveToLocalStorage(newFavoriteList);
  };

  return (
    <div className='container-fluid movie-app'>
      <div className='row d-flex align-items-center mt-4 mb-4'>
        <MovieListHeading />
        <SearchBox searchValue={searchValue} setSearchValue={setSearchValue} />
      </div>

     <div className='row'>
        <MovieList
          movies={movies}
          handleFavoritesClick={addFavoriteMovie}
          favoriteComponent={AddFavorites}
        />
      </div>
      <div className='row d-flex align-items-center watchlist'>
        <h1>Watchlist</h1>
      </div>
      <div className='row'>
        <MovieList
          movies={favorites}
          handleFavoritesClick={removeFavoriteMovie}
          favoriteComponent={RemoveFavorites}
        />
      </div>
    </div>
  );
};


export default App;
