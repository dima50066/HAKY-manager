import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectIsAuthenticated } from "../../redux/auth/selectors";

interface RestrictedRouteProps {
  component: JSX.Element;
  redirectTo?: string;
}

const RestrictedRoute = ({
  component,
  redirectTo = "/",
}: RestrictedRouteProps) => {
  const isLoggedIn = useSelector(selectIsAuthenticated);

  return isLoggedIn ? <Navigate to={redirectTo} /> : component;
};

export default RestrictedRoute;
