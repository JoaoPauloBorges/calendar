import Home from "pages/home";
import NotFound from "pages/notFound";
import { FC } from "react";
import { Route, Routes as RouterRoutes } from "react-router-dom";

const Routes: FC = () => (
  <RouterRoutes>
    <Route path="/" element={<Home />} />
    <Route path="*" element={<NotFound />} />
  </RouterRoutes>
);

export default Routes;
