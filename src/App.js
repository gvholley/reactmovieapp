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


  const getMovieRequest = async(searchValue) => {
    const url = `http://www.omdbapi.com/?s=${searchValue}&apikey=c5171cf5`
    const response = await fetch(url);
    const responseJson = await response.json();

    if(responseJson.Search) {
      setMovies(responseJson.Search);
    }
  };

  useEffect(() => {
    getMovieRequest(searchValue);
  }, [searchValue]);

  useEffect(()=> {
    const movieFavorites = JSON.parse(localStorage.getItem('app-favorites')
      );

    setFavorites(movieFavorites);
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
        <MovieListHeading heading='Movies' />
        <SearchBox searchValue={searchValue} setSearchValue={setSearchValue} />
      </div>

     <div className='row'>
        <MovieList
          movies={movies}
          handleFavoritesClick={addFavoriteMovie}
          favouriteComponent={AddFavorites}
        />
      </div>
      <div className='row d-flex align-items-center mt-4 mb-4'>
        <MovieListHeading heading='Favorites' />
      </div>
      <div className='row'>
        <MovieList
          movies={favorites}
          handleFavouritesClick={removeFavoriteMovie}
          favouriteComponent={RemoveFavorites}
        />
      </div>
    </div>
  );
};


export default App;
