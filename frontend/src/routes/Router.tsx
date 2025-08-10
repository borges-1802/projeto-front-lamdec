import { BrowserRouter, Routes, Route } from "react-router-dom";
import TesteApi from "../pages/TesteApi";
import Home from "../pages/Home";

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/teste" element={<TesteApi />} />
      </Routes>
    </BrowserRouter>
  );
}

//import { BrowserRouter, Routes, Route } from "react-router-dom";
//import Dashboard from "../pages/Dashboard";
//import BuscaCDA from "../pages/BuscaCDA";

//        <Route path="/" element={<Home />} />
//        <Route path="/cda" element={<BuscaCDA />} />