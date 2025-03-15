import { Routes, Route } from "react-router";

import HomePage from "../pages/HomePage/HomePage";
import MovieDetailsPage from "../pages/MovieDetailsPage/MovieDetailsPage";
import SeriesDetailsPage from "../pages/SeriesDetailsPage/SeriesDetailsPage";

function AppRouter() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/movies" element={<HomePage />} />
      <Route path="/movie/:movieId" element={<MovieDetailsPage />} />
      <Route path="/tv" element={<HomePage />} />
      <Route path="/tv/:tvId" element={<SeriesDetailsPage />} />
    </Routes>
  );
}

export default AppRouter;
