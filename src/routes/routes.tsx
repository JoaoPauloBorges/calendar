import Home from "pages/home";
import React, { FC } from "react";
import { Route, Routes as RouterRoutes } from "react-router-dom";

const Routes: FC = () => (
  <main style={{ height: "100%", width: "100%" }}>
    <RouterRoutes>
      <Route path="/" element={<Home />} />
    </RouterRoutes>
  </main>
);

export default Routes;
