import { useState } from "react";
import { useMovie } from "../context/Moviecontext.jsx";

const MovieForm = () => {
  const { addMovie } = useMovie();
  const [title, setTitle] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const trimmed = title.trim();
    if (!trimmed) return;

    addMovie({
      id: Date.now(),
      title: trimmed,
      watched: false,
      favorite: false,
    });
    setTitle("");
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginBottom: "1rem" }}>
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Add a movie title"
      />
      <button type="submit" style={{ marginLeft: "0.5rem" }}>
        Add
      </button>
    </form>
  );
};

export default MovieForm;
