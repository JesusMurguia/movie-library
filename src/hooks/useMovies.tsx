import { useCallback, useRef, useState } from "react";

export type Movie = {
	Title: string;
	Year: string;
	imdbID: string;
	Type: string;
	Poster: string;
};
function useMovies() {
	const [movies, setMovies] = useState<Movie[]>([]);
	const [isLoading, setIsLoading] = useState(false);
	const [isError, setIsError] = useState(false);
	const lastSearch = useRef("");

	const getMovies = useCallback(async (search: string = "mario bros") => {
		if (search === lastSearch.current) return;
		try {
			lastSearch.current = search;
			setIsLoading(true);
			const response = await fetch(
				`${import.meta.env.VITE_API_URL}?apiKey=${import.meta.env.VITE_API_KEY}&s=${search}`
			);
			const movies = await response.json();
			if (!movies.Search) throw new Error("No movies");
			setMovies(movies.Search);
		} catch (e) {
			setIsError(true);
		} finally {
			setIsLoading(false);
		}
	}, []);

	return { movies, getMovies, isLoading, isError };
}

export default useMovies;
