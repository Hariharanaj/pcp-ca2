import { useMovie } from "../context/Moviecontext.jsx";
import MovieCard from "./MovieCard.jsx";

const MovieList = () => {
  const { movies, loading } = useMovie();

  if (loading) return <p>Loading movies...</p>;

  if (!movies.length) return <p>No movies found.</p>;

  return (
    <section>
      {movies.map((movie) => (
        <MovieCard key={movie.id} movie={movie} />
      ))}
    </section>
  );
};

export default MovieList;
