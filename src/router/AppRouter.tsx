import { Routes, Route } from "react-router";

import Home from "../components/pages/Home";

function AppRouter() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
    </Routes>
  );
}

export default AppRouter;
