import React from "react";
import axios from "axios";

import MovieCard from "./MovieCard";

export default class Movie extends React.Component {
  state = {
    movie: null
  };

  componentDidMount() {
    this.fetchMovie(this.props.match.params.id);
  }

  componentWillReceiveProps(newProps) {
    if (this.props.match.params.id !== newProps.match.params.id) {
      this.fetchMovie(newProps.match.params.id);
    }
  }

  fetchMovie = id => {
    axios
      .get(`http://localhost:5000/api/movies/${id}`)
      .then(res => this.setState({ movie: res.data }))
      .catch(err => console.log('Fetch Error!', err.response));
  };

  saveMovie = () => {
    const addToSavedList = this.props.addToSavedList;
    addToSavedList(this.state.movie);
  };

  deleteMovie = id => {
    axios
      .delete(`http://localhost:5000/api/movies/${this.state.movie.id}`)
      .then(res => {
        console.log('Delete Call!', res.data)
        this.props.history.push('/')
      })
      .catch(err => {
        console.log('Delete Error!', err.response)
      })
    
  }

  render() {
    if (!this.state.movie) {
      return <div>Loading movie information...</div>;
    }

    return (
      <div className="save-wrapper">
        <MovieCard { ...this.props }movie={ this.state.movie } />
        <button className='update-button' onClick={() => this.props.history.push(`/update-movie/${this.state.movie.id}`)}>
          Update
        </button>
        <button className='delete-button' onClick={ this.deleteMovie }>
          Delete
        </button>
        <button className="save-button" onClick={ this.saveMovie }>
          Save
        </button>
      </div>
    );
  }
}
