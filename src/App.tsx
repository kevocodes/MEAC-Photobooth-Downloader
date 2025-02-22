import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { PUBLIC_ROUTES } from "@/constants/routes";
import Home from "@/pages/Home";
import MainLayout from "./layouts/MainLayout";
import Photography from "./pages/Photography";

function App() {
  return (
    <Router>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path={PUBLIC_ROUTES.HOME} element={<Home />} />
          <Route path={`${PUBLIC_ROUTES.PHOTOGRAPHY}/:photographyId`} element={<Photography />} />
        </Route>
        <Route path="*" element={<Navigate to={PUBLIC_ROUTES.HOME} />} />
      </Routes>
    </Router>
  );
}

export default App;
