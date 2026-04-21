import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
} from "react-router-dom";

import MainLayout from "../layout/Mainlayout.jsx";
import Home from "../pages/Home.jsx";
import Favorites from "../pages/Favorites.jsx";

const AppRouter = () => {
  return (
    <Router>
      <MainLayout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/favorites" element={<Favorites />} />
          <Route path="*" element={<Home />} />
        </Routes>
      </MainLayout>
    </Router>
  );
};

export default AppRouter;
