import { useState } from "react";
import { Movie } from "../hooks/useMovies";
import MovieDetails from "./MovieDetails";

function MovieCard(movie: Movie) {
	const [showModal, setShowModal] = useState(false);

	const handleClick = () => {
		setShowModal(true);
	};

	const closeModal = () => {
		setShowModal(false);
	};

	return (
		<div key={movie.imdbID}>
			<div className="card" onClick={() => handleClick()}>
				<h3>{movie.Title}</h3>
				<div className="img-wrapper">
					<img src={movie.Poster} alt={`${movie.Title}'s poster`} />
					<span>{movie.Year}</span>
				</div>
			</div>
			{showModal && <MovieDetails id={movie.imdbID} closeModal={closeModal} />}
		</div>
	);
}

export default MovieCard;
