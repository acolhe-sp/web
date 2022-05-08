import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import DonorRegister from "./pages/DonorRegister";

export default function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" exact element={<Login />} />
        <Route path="/donor-register" element={<DonorRegister />} />
      </Routes>
    </BrowserRouter>
  );
}