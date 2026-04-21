import { useMovie } from "../context/Moviecontext.jsx";

const MovieCard = ({ movie }) => {
  const { toggleWatched, toggleFavorite, deleteMovie } = useMovie();

  return (
    <article style={{ border: "1px solid #ddd", padding: "0.75rem", marginBottom: "0.5rem" }}>
      <h3 style={{ margin: 0 }}>{movie.title || "Untitled movie"}</h3>
      <p style={{ margin: "0.25rem 0" }}>
        Watched: {movie.watched ? "Yes" : "No"} | Favorite: {movie.favorite ? "Yes" : "No"}
      </p>
      <div>
        <button onClick={() => toggleWatched(movie.id)}>Toggle Watched</button>
        <button onClick={() => toggleFavorite(movie.id)} style={{ marginLeft: "0.5rem" }}>
          Toggle Favorite
        </button>
        <button onClick={() => deleteMovie(movie.id)} style={{ marginLeft: "0.5rem" }}>
          Delete
        </button>
      </div>
    </article>
  );
};

export default MovieCard;
