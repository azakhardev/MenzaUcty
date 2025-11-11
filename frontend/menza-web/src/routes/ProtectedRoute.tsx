import {Navigate, Outlet} from "react-router";
import {useCanteenStore} from "../store/store.ts";

export default function ProtectedRoute() {
    const userId = useCanteenStore((state) => state.userId);

    const isAuthenticated =
        userId !== undefined || sessionStorage.getItem("userId") !== null;

    return isAuthenticated ? <Outlet/> : <Navigate to="/login" replace/>;
}
