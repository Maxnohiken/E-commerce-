import { CircularProgress } from "@mui/material";
import { useContext } from "react";
import { AppContext } from "./Context";
import { BrowserRouter, Route, Routes } from "react-router-dom";

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
      {!paid && <Navbar />}
      <Routes>
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
