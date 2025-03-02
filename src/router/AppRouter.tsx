import { Routes, Route } from "react-router";

import HomePage from "../pages/HomePage/HomePage";

function AppRouter() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
    </Routes>
  );
}

export default AppRouter;
