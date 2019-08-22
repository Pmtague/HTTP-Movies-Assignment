import React, { useState, useEffect } from "react";
import { Route } from "react-router-dom";
import axios from "axios";

import SavedList from "./Movies/SavedList";
import MovieList from "./Movies/MovieList";
import Movie from "./Movies/Movie";
import MovieUpdate from './Movies/MovieUpdate';

const App = () => {
  const [savedList, setSavedList] = useState([]);
  const[movie, setMovie] = useState([]);

  const addToSavedList = movie => {
    setSavedList([...savedList, movie]);
  };

  useEffect(() => {
    axios 
      .get('http://localhost5000/api/movies')
      .then(res => {
        console.log(res.data)
        setMovie(res.data)
      })
      .catch(err => console.log('Updated Movies GET', err.response))
  }, [])

  return (
    <>
      <SavedList list={savedList} />
      <Route 
        exact path="/" 
        render={ props => {
          return <MovieList { ...props } movie={ movie } />
        }} 
      />
      <Route
        path="/movies/:id"
        render={props => {
          return <Movie {...props} addToSavedList={addToSavedList} />;
        }}
      />
      <Route
        path='/update-movie/:id' 
        render={ props => {
          return <MovieUpdate { ...props } movie={ movie } setMovie={ setMovie } />
        }}/>
    </>
  );
};

export default App;
