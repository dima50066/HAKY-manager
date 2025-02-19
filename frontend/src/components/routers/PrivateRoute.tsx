import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectIsAuthenticated } from "../../redux/auth/selectors";

interface PrivateRouteProps {
  component: JSX.Element;
  redirectTo?: string;
}

const PrivateRoute = ({ component, redirectTo = "/" }: PrivateRouteProps) => {
  const isLoggedIn = useSelector(selectIsAuthenticated);

  return isLoggedIn ? component : <Navigate to={redirectTo} />;
};

export default PrivateRoute;
