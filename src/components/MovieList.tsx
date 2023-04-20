import type { Movie } from "../hooks/useMovies";
import MovieCard from "./MovieCard";

type MovieProps = {
	movies: Movie[];
};
function MovieList(props: MovieProps) {
	return <>{!!props.movies && <ul className="movie-grid">{props.movies.map(MovieCard)}</ul>}</>;
}

export default MovieList;
