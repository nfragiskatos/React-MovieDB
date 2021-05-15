import React from 'react';
import { useParams, Link } from 'react-router-dom';
import useFetch from './useFetch';
import { proj } from './ProjectProperties';
const url = 'https://upload.wikimedia.org/wikipedia/commons/f/fc/No_picture_available.png';

const SingleMovie = () => {
	const { id } = useParams();
	const { isLoading, error, data: movie } = useFetch(`&i=${id}`);

	if (isLoading) {
		return <div className="loading" />;
	}
	if (error.show) {
		return (
			<div className="page-error">
				<h1>{error.msg}</h1>
				<Link to={proj.nav.home} className="btn">
					return to movies
				</Link>
			</div>
		);
	}

	const { Title: title, Plot: plot, Year: year, Poster: poster } = movie;

	return (
		<section className="single-movie">
			<img src={poster === 'N/A' ? url : poster} alt={title} />
			<div className="single-movie-info">
				<h2>{title}</h2>
				<p>{plot}</p>
				<h4>{year}</h4>
				<Link to={proj.nav.home} className="btn">
					return to movies
				</Link>
			</div>
		</section>
	);
};

export default SingleMovie;
