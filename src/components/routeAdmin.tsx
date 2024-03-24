import { useContext } from "react";
import { Outlet, Navigate } from "react-router-dom";
import { AppContext } from "../Context";

export function RouteAdmin() {
  const { admin } = useContext(AppContext);

  if (admin ) {
    return <Outlet />;
  } else {
    return <Navigate to="/" />;
  }
}
