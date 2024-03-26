import { CircularProgress } from "@mui/material";
import { useContext } from "react";
import { AppContext } from "./Context";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Route404 from "./Routes/404";
import { RouteHome } from "./Routes/Home";

import { RouteProtectedCheckout } from "./Routes/routeProtectedCheckout";
import { RouteAdmin } from "./Routes/routeAdmin";

import RouteDashboard from "./Routes/dashboard";
import RouteCheckout from "./Routes/checkout";

function App() {
  const { products } = useContext(AppContext);

  if (products.length === 0)
    return (
      <div
        style={{
          height: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <CircularProgress />
      </div>
    );
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<RouteHome />}></Route>
        <Route element={<RouteProtectedCheckout />}>
          <Route path="/checkout" element={<RouteCheckout />} />
        </Route>
        <Route element={<RouteAdmin />}>
          <Route path="/dashboard" element={<RouteDashboard />} />
        </Route>
        <Route path="/404" element={<Route404 />} />
        <Route path="*" element={<Navigate to="/404" />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
