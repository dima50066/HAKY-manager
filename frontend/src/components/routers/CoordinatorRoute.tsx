import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import {
  selectIsAuthenticated,
  selectUserRole,
} from "../../redux/auth/selectors";

interface CoordinatorRouteProps {
  component: JSX.Element;
  redirectTo?: string;
}

const CoordinatorRoute = ({
  component,
  redirectTo = "/",
}: CoordinatorRouteProps) => {
  const isLoggedIn = useSelector(selectIsAuthenticated);
  const role = useSelector(selectUserRole);

  if (!isLoggedIn) {
    return <Navigate to="/login" />;
  }

  return role === "coordinator" ? component : <Navigate to={redirectTo} />;
};

export default CoordinatorRoute;
