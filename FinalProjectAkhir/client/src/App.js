import React from "react";
import "./App.css";
import {
  Route,
  Routes,
  Outlet,
  Navigate,
  BrowserRouter,
} from "react-router-dom";
// components
import ListBarang from "./pages/listBarang";
import ListUser from "./pages/listUser";
import Dashboard from "./pages/dashboard";
import ListBarangMasuk from "./pages/listBarangMasuk";
import ListBarangKeluar from "./pages/listBarangKeluar";
import Home from "./pages/home";
import Login from "./pages/login";
import Register from "./pages/register";
import { useSelector } from "react-redux";

const PrivateRoutes = () => {
  const { isAuth } = useSelector((state) => state.auth);

  return <>{isAuth ? <Outlet /> : <Navigate to="/login" />}</>;
};

const RestrictedRoutes = () => {
  const { isAuth } = useSelector((state) => state.auth);

  return <>{!isAuth ? <Outlet /> : <Navigate to="/dashboard" />}</>;
};

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" exact element={<Home />} />
        <Route element={<PrivateRoutes />}>
          <Route path="/dashboard" exact element={<Dashboard />} />
          <Route path="/barang" exact element={<ListBarang />} />
          <Route path="/barang-masuk" exact element={<ListBarangMasuk />} />
          <Route path="/barang-keluar" exact element={<ListBarangKeluar />} />
          <Route path="/users" exact element={<ListUser />} />
          <Route path="/register" exact element={<Register />} />
        </Route>
        <Route element={<RestrictedRoutes />}>
          <Route path="/login" exact element={<Login />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
