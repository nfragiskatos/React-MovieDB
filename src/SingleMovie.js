import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { API_ENDPOINT } from './context';
const url = 'https://upload.wikimedia.org/wikipedia/commons/f/fc/No_picture_available.png';

const SingleMovie = () => {
	const { id } = useParams();
	const [ movie, setMovie ] = useState({});
	const [ isLoading, setIsLoading ] = useState(true);
	const [ error, setError ] = useState({ show: false, msg: '' });

	const fetchMovie = async (url) => {
		setIsLoading(true);
		const response = await fetch(url);
		const data = await response.json();

		if (data.Response === 'True') {
			setMovie(data);
		} else {
			setError({
				show : true,
				msg  : data.Error
			});
		}
		setIsLoading(false);
	};

	useEffect(
		() => {
			fetchMovie(`${API_ENDPOINT}&i=${id}`);
		},
		[ id ]
	);

	if (isLoading) {
		return <div className='loading' />;
	}
	if (error.show) {
		return (
			<div className='page-error'>
				<h1>{error.msg}</h1>
				<Link to='/' className='btn'>
					return to movies
				</Link>
			</div>
		);
	}

	const { Title: title, Plot: plot, Year: year, Poster: poster } = movie;

	return (
		<section className='single-movie'>
			<img src={poster === 'N/A' ? url : poster} alt={title} />
			<div className='single-movie-info'>
				<h2>{title}</h2>
				<p>{plot}</p>
				<h4>{year}</h4>
				<Link to='/' className='btn'>
					return to movies
				</Link>
			</div>
		</section>
	);
};

export default SingleMovie;
