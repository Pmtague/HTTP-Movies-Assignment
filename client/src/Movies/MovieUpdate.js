import React, { useState, useEffect } from 'react';
import axios from 'axios';

const MovieUpdate = props => {
	const initialMovie = {
		title: '',
		director: '',
		metascore: '',
		stars: []
	}

	const [movie, setMovie] = useState(initialMovie);

	useEffect(() => {
		const id = props.match.params.id;
		const movieInArray = props.movie.find(mov => `${mov.id}` === id);
		if (movieInArray) {
			setMovie(movieInArray)
		}
	}, [movie.id, props.movie, props.match.params.id])

	const changeHandler = e => {
		e.persist();
		let value = e.target.value;
		if (e.target.name === 'metascore') {
			value = parseInt(value, 10);
		}

		setMovie({
			...movie,
			[e.target.name]: value

		})
	}

	const starsChangeHandler = index => e => {
		setMovie({ ...movie, stars: movie.stars.map((star, starIndex) =>{
			return starIndex === index ? e.target.value : star;
		})})
	}

	const handleSubmit = event => {
		event.preventDefault();
		axios
			.put(`http://localhost:5000/api/movies/${movie.id}`, movie)
			.then(res => {
				console.log('Update Form Put', res);
				// const newMovieList = props.movie.filter(m=> m.id !== res.data.id)
				// newMovieList.push(res.data)
				// props.setItem(newMovieList);
				props.history.push('/');
			})
			.catch(err => console.log('Update Error!', err.response));
	}

	return (
		<div className='update-movie-card'>
			<h2>Update Movie</h2>
			<form onSubmit={handleSubmit}>
				<label>Title</label>
				<input
					type="text"
					name="title"
					onChange={changeHandler}
					value={movie.title}
				/>
		    		<div className="baseline" />
				<label>Director</label>
				<input
					type="text"
					name="director"
					onChange={changeHandler}
					value={movie.director}
				/>
				<div className="baseline" />
				<label>Metascore</label>
				<input
					type="number"
					name="metascore"
					onChange={changeHandler}
					value={movie.metascore}
				/>
				<div className="baseline" />
				<label>Actors</label>
				{movie.stars.map((starName, index) => {
					return <input
							className='stars-map'
							type="text"
							name="stars"
							onChange={starsChangeHandler(index)}
							value={starName}
						/>
				})}
				<div className="baseline" />
	    
		    		<button className="update-movie-btn">Update</button>
			</form>
		</div>
	      );
}

export default MovieUpdate;