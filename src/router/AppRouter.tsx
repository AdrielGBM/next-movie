import { Routes, Route } from "react-router";

import HomePage from "../pages/HomePage/HomePage";
import MoviesPage from "../pages/MoviesPage/MoviesPage";
import MovieDetailsPage from "../pages/MovieDetailsPage/MovieDetailsPage";
import SeriesPage from "../pages/SeriesPage/SeriesPage";
import SeriesDetailsPage from "../pages/SeriesDetailsPage/SeriesDetailsPage";

function AppRouter() {
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
