import { Routes, Route } from "react-router-dom";
import * as ROUTES from "./constants/routes";
import Home from "./components/Home";
import "./App.css";
import Convert from "./components/Convert";

function App() {
  return (
    <Routes>
      <Route path={ROUTES.HOME} element={<Home />} />
      <Route path={ROUTES.CONVERT} element={<Convert />} />
    </Routes>
  );
}

export default App;
