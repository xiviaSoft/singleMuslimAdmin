import { LinearProgress } from "@mui/material";
import { ROUTES } from "constant";
import { useAuth } from "context";
import { Navigate, Outlet, useLocation } from "react-router";




const NormalRoutes = () => {
    const { user, loading } = useAuth();
    const location = useLocation();


    if (loading) {
        return <LinearProgress />
    }

    return !user ? <Outlet /> : <Navigate to={ROUTES.ADMINS} state={{ from: location }} replace />
}







export default NormalRoutes
