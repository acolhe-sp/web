import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/login/Login";
import DonorRegister from "./pages/register/DonorRegister";
import Home from "./pages/home/Home";
import PerfilOng from "./pages/perfilOng/PerfilOng";
import PerfilDoador from "./pages/perfilDoador/PerfilDoador";

export default function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/donor-register" element={<DonorRegister />} />
        <Route path="/home" element={<Home />} />
        <Route path="/perfil-ong/:id" element={<PerfilOng />} />
        <Route path="/perfil-donor" element={<PerfilDoador />} />
      </Routes>
    </BrowserRouter>
  );
}