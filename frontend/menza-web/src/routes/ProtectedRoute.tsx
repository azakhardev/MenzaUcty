import {Navigate, Outlet} from "react-router";
import {useCanteenStore} from "../store/store.ts";

export default function ProtectedRoute() {
    const user = useCanteenStore((state) => state.user);

    const isAuthenticated =
        user !== undefined || sessionStorage.getItem("user") !== null;

    return isAuthenticated ? <Outlet/> : <Navigate to="/login" replace/>;
}
