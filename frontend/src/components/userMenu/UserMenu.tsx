import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { selectUser, selectUserLoading } from "../../redux/auth/selectors";
import { logOut } from "../../redux/auth/operations";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-toastify";
import Icon from "../../shared/icon/Icon";
import { useTranslation } from "react-i18next";

interface UserMenuProps {
  closeMenu?: () => void;
}

const UserMenu: React.FC<UserMenuProps> = ({ closeMenu }) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const currentUser = useSelector(selectUser);
  const userLoading = useSelector(selectUserLoading);
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await dispatch(logOut() as unknown as any);
      toast.success(t("success_logout"));
      navigate("/");
      if (closeMenu) closeMenu();
    } catch (error) {
      toast.error(t("failed_logout"));
    }
  };

  if (userLoading) {
    return (
      <div className="flex items-center space-x-4 p-2 bg-[#151728] text-gray-300 rounded-lg shadow-md justify-between">
        <p className="text-gray-500">{t("loading")}</p>
      </div>
    );
  }

  return (
    <div className="flex items-center space-x-4 p-2 bg-[#151728] text-gray-300 rounded-lg shadow-md justify-between">
      {currentUser ? (
        <>
          <Link
            to="/profile"
            className="flex items-center space-x-2 hover:text-white transition"
            onClick={closeMenu}
          >
            <Icon id="user" width="22" height="22" className="text-white" />
            <p className="text-lg font-semibold text-white sm:hidden">
              {currentUser.name}
            </p>
            <p className="hidden sm:block text-lg">
              {t("hello")}{" "}
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
            {t("logout")}
          </button>
        </>
      ) : (
        <p className="text-gray-500">{t("please_login")}</p>
      )}
    </div>
  );
};

export default UserMenu;
