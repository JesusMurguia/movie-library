import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import MovieList from "./components/MovieList";
import useMovies from "./hooks/useMovies";

function App() {
	const [search, setSearch] = useState("");
	const { movies, getMovies, isLoading, isError } = useMovies();

	useEffect(() => {
		getMovies();
	}, []);

	const handleChange = (e: ChangeEvent<HTMLInputElement>) => setSearch(e.target.value);

	const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		getMovies(search);
	};
	return (
		<>
			<header>
				<h1>Open Movie Library</h1>
				<form onSubmit={handleSubmit}>
					<input
						value={search}
						onChange={handleChange}
						type="text"
						placeholder="Creed III, Corsage, The Son.."
					/>
					<button type="submit">Search</button>
				</form>
			</header>
			<main>
				{isLoading && <p>Loading...</p>}
				{isError ? <p>No results.</p> : <MovieList movies={movies} />}
			</main>
		</>
	);
}

export default App;
// {import.meta.env.VITE_API_URL}
