import { Navigate, Outlet } from "react-router-dom";
import { AppContext } from "../Context";
import { useContext } from "react";

export function RoutePay() {

const { paid } = useContext(AppContext);

if(paid) return <Outlet/>
return <Navigate to={"/"} />
}
