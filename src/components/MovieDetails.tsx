import { useEffect } from "react";
import useGetMovie from "../hooks/useGetMovie";

type MovieDetailsType = {
	id: string;
	closeModal: () => void;
};

function MovieDetails(props: MovieDetailsType) {
	const { movie, getMovie } = useGetMovie();

	useEffect(() => {
		getMovie(props.id);
	}, []);

	useEffect(() => {
		function handleEscKey(event: KeyboardEvent) {
			if (event.key === "Escape") {
				props.closeModal();
			}
		}
		document.addEventListener("keydown", handleEscKey);
		return () => {
			document.removeEventListener("keydown", handleEscKey);
		};
	}, [props.closeModal]);

	if (movie) {
		return (
			<div className="modal">
				<div className="modal-content">
					<button className="close-button" onClick={() => props.closeModal()}>
						X
					</button>
					<div className="modal-header">
						<div className="modal-info">
							<h1>{movie.Title}</h1>
							<div className="info-slip">
								<span>
									{movie.Year} · {movie.Rated} · {movie.Runtime}
								</span>
								<span>Genre: {movie.Genre}</span>
							</div>
						</div>
					</div>
					<div className="modal-body">
						<img src={movie.Poster} alt={`${movie.Title}'s poster`} />
						<p>{movie.Plot}</p>
						<br />
						<br />
						<h4>Director: {movie.Director}</h4>
						<h4>Writer: {movie.Writer}</h4>
						<h4>Actors: {movie.Actors}</h4>
					</div>
				</div>
			</div>
		);
	}
	return <div></div>;
}

export default MovieDetails;
