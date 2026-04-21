import React from "react";

import MovieList from "../components/MovieList.jsx";
import MovieForm from "../components/MovieForm.jsx";

const Home = () => (
  <div className="app-container" data-testid="home-page">
    <h1 className="main-title" data-testid="app-title">
      🎬 Movie Wishlist
    </h1>
    <MovieForm />
    <MovieList />
  </div>
);

export default Home;
