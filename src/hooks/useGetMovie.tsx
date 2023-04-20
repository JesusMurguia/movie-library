import { useCallback, useState } from "react";

export type MovieFullDetails = {
	Title: string;
	Year: string;
	Rated: string;
	Released: string;
	Runtime: string;
	Genre: string;
	Director: string;
	Writer: string;
	Actors: string;
	Plot: string;
	Language: string;
	Country: string;
	Awards: string;
	Poster: string;
	Ratings: {
		Source: string;
		Value: string;
	}[];
	Metascore: string;
	imdbRating: string;
	imdbVotes: string;
	imdbID: string;
	Type: string;
	DVD: string;
	BoxOffice: string;
	Production: string;
	Website: string;
	Response: string;
};
function useMovies() {
	const [movie, setMovie] = useState<MovieFullDetails>();
	const [isLoading, setIsLoading] = useState(false);
	const [isError, setIsError] = useState(false);

	const getMovie = useCallback(async (id: string) => {
		try {
			setIsLoading(true);
			const response = await fetch(
				`${import.meta.env.VITE_API_URL}?apiKey=${import.meta.env.VITE_API_KEY}&i=${id}&plot=full`
			);
			const movies = await response.json();
			if (!movies.Response) throw new Error("No movie by that id");
			setMovie(movies);
		} catch (e) {
			setIsError(true);
		} finally {
			setIsLoading(false);
		}
	}, []);

	return { movie, getMovie, isLoading, isError };
}

export default useMovies;
