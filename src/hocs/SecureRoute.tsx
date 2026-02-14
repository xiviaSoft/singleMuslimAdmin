import { LinearProgress } from "@mui/material";
import { ROUTES } from "constant";
import { useAuth } from "context"
import { Navigate, Outlet, useLocation } from "react-router";


const SecureRoute = () => {
  const { user, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return <LinearProgress />
  }


  return !user ? <Navigate to={ROUTES.LOGIN} state={{ from: location }} replace /> : <Outlet />
}




export default SecureRoute
