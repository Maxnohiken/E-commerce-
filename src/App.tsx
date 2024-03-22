import { CircularProgress } from "@mui/material";
import { useContext } from "react";
import { AppContext } from "./Context";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

import DrawerAppBar from "./components/navbarComponent";
import { Route404 } from "./Routes/404";
import { RouteCheckout } from "./Routes/Checkout";
import { RouteHome } from "./Routes/Home";

function App() {
  const { paid, username, products } = useContext(AppContext);

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
        <DrawerAppBar />
        <Route path="/" element={<RouteHome />}></Route>
        <Route element={<RouteProtected />}>
          <Route path="/checkout" element={<RouteCheckout />} />
        </Route>
        <Route element={<RouteAdmin />}>
          <Route path="/Dashboard" element={<RouteDashboard />} />
        </Route>
        <Route path="/404" element={<Route404 />} />
        <Route path="*" element={<Navigate to="/404" />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
