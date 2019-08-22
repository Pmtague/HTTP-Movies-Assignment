import React, { useState, useEffect } from 'react';
import axios from 'axios';

const initialItem = {
	id: '',
	title: '',
	director: '',
	metascore: '',
	stars: []
}

const MovieUpdate = props => {
	const [item, setItem] = useState(initialItem);

	useEffect(() => {
		const id = props.match.params.id;
		const itemInArray = props.movie.find(item => `${item.id}` === id);
		if (itemInArray) {
			setItem(itemInArray)
		}
	}, [props.movie, props.match.params.id])

	const changeHandler = e => {
		setItem({
			...item,
			[e.target.name]: e.target.value

		})
	}

	const handleSubmit = event => {
		event.preventDefault();
		axios
			.put(`http://localhost:5000/api/movies/${item.id}`, item)
			.then(res => {
				const newMovieList = props.item.filter(movie => movie.id !== res.data.id)
				newMovieList.push(res.data)
				setItem(initialItem);
				props.setItem(newMovieList);
				props.history.push('/');
			})
			.catch(err => console.log('Update Error!', err.response));
	}

	return (
		<div>
			<h2>Update Movie</h2>
			<form onSubmit={handleSubmit}>
				<label>Title</label>
				<input
					type="text"
					name="title"
					onChange={changeHandler}
					placeholder="title"
					value={item.title}
				/>
		    		<div className="baseline" />
				<label>Director</label>
				<input
					type="text"
					name="director"
					onChange={changeHandler}
					placeholder="director"
					value={item.director}
				/>
				<div className="baseline" />
				<label>Metascore</label>
				<input
					type="number"
					name="metascore"
					onChange={changeHandler}
					placeholder="metascore"
					value={item.metascore}
				/>
				<div className="baseline" />
				<label>Actors</label>
				<input
					type="text"
					name="stars"
					onChange={changeHandler}
					value={item.stars}
				/>
				<div className="baseline" />
	    
		    		<button className="md-button form-button">Update</button>
			</form>
		</div>
	      );
}

export default MovieUpdate;