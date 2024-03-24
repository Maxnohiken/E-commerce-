import { CircularProgress } from "@mui/material";
import { useContext } from "react";
import { AppContext } from "./Context";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

import { Route404 } from "./Routes/404";
import { RouteHome } from "./Routes/Home";

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
          <Route path="/checkout" element={<RouteCheckout />} />1
          <Route path="/dashboard" element={<RouteDashboard />} />

        <Route path="/404" element={<Route404 />} />
        <Route path="*" element={<Navigate to="/404" />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
