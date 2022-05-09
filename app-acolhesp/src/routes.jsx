import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/login/Login";
import DonorRegister from "./pages/register/DonorRegister";
import Home from "./pages/home/Home";

export default function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/donor-register" element={<DonorRegister />} />
        <Route path="/home" element={<Home />} />
      </Routes>
    </BrowserRouter>
  );
}