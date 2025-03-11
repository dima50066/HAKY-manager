import React, { useState } from "react";
import { useSelector } from "react-redux";
import { selectIsAuthenticated } from "../../redux/auth/selectors";
import Modal from "../../shared/modal/Modal";
import LoginForm from "../auth/LoginForm";

interface PrivateRouteProps {
  component: JSX.Element;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ component }) => {
  const isLoggedIn = useSelector(selectIsAuthenticated);
  const [isLoginOpen, setIsLoginOpen] = useState(!isLoggedIn);

  if (isLoggedIn) {
    return component;
  }

  return (
    <Modal isOpen={isLoginOpen} onClose={() => setIsLoginOpen(false)}>
      <h2 className="text-xl font-semibold text-gray-800 text-center mb-4">
        Please log in to continue
      </h2>
      <LoginForm />
    </Modal>
  );
};

export default PrivateRoute;
