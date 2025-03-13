import { Routes, Route } from "react-router";

import HomePage from "../pages/HomePage/HomePage";

function AppRouter() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/movies" element={<HomePage />} />
      <Route path="/movie/:movieId" element={<HomePage />} />
      <Route path="/tv" element={<HomePage />} />
      <Route path="/tv/:tvId" element={<HomePage />} />
    </Routes>
  );
}

export default AppRouter;
