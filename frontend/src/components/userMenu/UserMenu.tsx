import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { selectUser } from "../../redux/auth/selectors";
import { logOut } from "../../redux/auth/operations";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-toastify";
import Icon from "../../shared/icon/Icon";

const UserMenu: React.FC = () => {
  const dispatch = useDispatch();
  const currentUser = useSelector(selectUser);
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await dispatch(logOut() as unknown as any);
      toast.success("Successfully logged out!");
      navigate("/");
    } catch (error) {
      toast.error("Failed to log out. Please try again.");
    }
  };

  return (
    <div className="flex items-center space-x-4 p-2 bg-[#151728] text-gray-300 rounded-lg shadow-md justify-between">
      {currentUser ? (
        <>
          <Link
            to="/profile"
            className="flex items-center space-x-2 hover:text-white transition"
          >
            <Icon id="user" width="22" height="22" className="text-white" />
            <p className="text-lg font-semibold text-white sm:hidden">
              {currentUser.name}
            </p>
            <p className="hidden sm:block text-lg">
              Hello,{" "}
              <span className="font-semibold text-white">
                {currentUser.name}
              </span>
            </p>
          </Link>
          <button
            onClick={handleLogout}
            className="flex items-center px-4 py-2 rounded-md bg-[#e74c3c] text-white hover:bg-red-500 transition duration-200"
          >
            <Icon
              id="logOut"
              width="20"
              height="20"
              className="mr-2 stroke-white"
            />
            Log out
          </button>
        </>
      ) : (
        <p className="text-gray-500">Please log in.</p>
      )}
    </div>
  );
};

export default UserMenu;
