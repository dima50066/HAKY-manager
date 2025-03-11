import React, { useState } from "react";
import { useSelector } from "react-redux";
import {
  selectIsAuthenticated,
  selectUserRole,
} from "../../redux/auth/selectors";
import Modal from "../../shared/modal/Modal";
import LoginForm from "../auth/LoginForm";

interface CoordinatorRouteProps {
  component: JSX.Element;
}

const CoordinatorRoute: React.FC<CoordinatorRouteProps> = ({ component }) => {
  const isLoggedIn = useSelector(selectIsAuthenticated);
  const role = useSelector(selectUserRole);
  const [isLoginOpen, setIsLoginOpen] = useState(!isLoggedIn);

  if (!isLoggedIn) {
    return (
      <Modal isOpen={isLoginOpen} onClose={() => setIsLoginOpen(false)}>
        <h2 className="text-xl font-semibold text-gray-800 text-center mb-4">
          Please log in as a Coordinator
        </h2>
        <LoginForm />
      </Modal>
    );
  }

  return role === "coordinator" ? component : <p>Access denied</p>;
};

export default CoordinatorRoute;
