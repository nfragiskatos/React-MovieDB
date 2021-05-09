import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { API_ENDPOINT } from './context';

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

		console.log(data);
	};

	useEffect(
		() => {
			fetchMovie(`${API_ENDPOINT}&i=${id}`);
		},
		[ id ]
	);
	return <h2>single movie</h2>;
};

export default SingleMovie;
