import { useEffect } from "react";
import { Routes, Route, useLocation } from "react-router";

import HomePage from "../pages/HomePage/HomePage";
import MoviesPage from "../pages/MoviesPage/MoviesPage";
import MovieDetailsPage from "../pages/MovieDetailsPage/MovieDetailsPage";
import SeriesPage from "../pages/SeriesPage/SeriesPage";
import SeriesDetailsPage from "../pages/SeriesDetailsPage/SeriesDetailsPage";

function AppRouter() {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/movies" element={<MoviesPage />} />
      <Route path="/movie/:movieId" element={<MovieDetailsPage />} />
      <Route path="/tv" element={<SeriesPage />} />
      <Route path="/tv/:tvId" element={<SeriesDetailsPage />} />
    </Routes>
  );
}

export default AppRouter;
