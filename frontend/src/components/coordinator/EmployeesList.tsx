import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { AppDispatch } from "../../redux/store";
import { fetchEmployees } from "../../redux/coordinator/operations";
import {
  selectEmployees,
  selectEmployeesLoading,
  selectEmployeesError,
} from "../../redux/coordinator/selectors";
import EmployeeCard from "./EmployeeCard";
import Loader from "../../shared/loader/Loader";
import useLoader from "../../hooks/useLoader";

const EmployeesList: React.FC = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch<AppDispatch>();
  const employees = useSelector(selectEmployees);
  const isLoading = useSelector(selectEmployeesLoading);
  const error = useSelector(selectEmployeesError);

  useEffect(() => {
    dispatch(fetchEmployees());
  }, [dispatch]);

  const showLoader = useLoader(isLoading);

  if (showLoader) {
    return <Loader />;
  }

  if (error)
    return (
      <p className="text-center text-red-500">
        {t("error_message")} {error}
      </p>
    );

  if (employees.length === 0)
    return <p className="text-center">{t("no_employees_found")}</p>;

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">{t("employees")}</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {employees.map((employee) => (
          <EmployeeCard key={employee._id} employee={employee} />
        ))}
      </div>
    </div>
  );
};

export default EmployeesList;
