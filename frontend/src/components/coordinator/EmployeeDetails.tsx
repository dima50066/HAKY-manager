import React, { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { AppDispatch } from "../../redux/store";
import {
  fetchEmployeeById,
  deleteEmployee,
} from "../../redux/coordinator/operations";
import {
  selectEmployeeById,
  selectEmployeeByIdLoading,
} from "../../redux/coordinator/selectors";
import { EmployeeInfo } from "./EmployeeInfo";
import { EmployeeProductivity } from "./EmployeeProductivity";
import { EmployeeSalary } from "./EmployeeSalary";
import { EmployeeDocuments } from "./EmployeeDocuments";
import { EmployeeActions } from "./EmployeeActions";
import Modal from "../../shared/modal/Modal";

const EmployeeDetails: React.FC = () => {
  const { t } = useTranslation();
  const { id } = useParams<{ id: string }>();
  const profileId = id ?? "";
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const employee = useSelector(selectEmployeeById(profileId));
  const isLoading = useSelector(selectEmployeeByIdLoading);

  const userId = useMemo(() => employee?.user._id || "", [employee]);

  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [openModal, setOpenModal] = useState<string | null>(null);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (profileId) {
      dispatch(fetchEmployeeById(profileId));
    }
  }, [dispatch, profileId]);

  const handleDelete = async () => {
    if (window.confirm(t("delete_employee_confirmation"))) {
      await dispatch(deleteEmployee(profileId));
      navigate("/coordinator");
    }
  };

  if (isLoading)
    return <p className="text-center text-blue-500">{t("loading_employee")}</p>;
  if (!employee)
    return (
      <p className="text-center text-red-500">{t("employee_not_found")}</p>
    );

  return (
    <div className="p-4 max-w-4xl mx-auto bg-white shadow-md rounded-lg">
      <div className="p-4 bg-gray-100 rounded-lg shadow-sm">
        <EmployeeInfo employee={employee} />
        <div className="mt-4">
          <EmployeeActions profileId={profileId} onDelete={handleDelete} />
        </div>
      </div>

      {isMobile ? (
        <div className="space-y-4 mt-4">
          <button
            className="w-full py-2 bg-blue-500 text-white rounded-lg"
            onClick={() => setOpenModal("productivity")}
          >
            {t("view_productivity")}
          </button>
          <button
            className="w-full py-2 bg-blue-500 text-white rounded-lg"
            onClick={() => setOpenModal("salary")}
          >
            {t("view_salary")}
          </button>
          <button
            className="w-full py-2 bg-blue-500 text-white rounded-lg"
            onClick={() => setOpenModal("documents")}
          >
            {t("view_documents")}
          </button>

          <Modal
            isOpen={openModal === "productivity"}
            onClose={() => setOpenModal(null)}
            classNameWrapper="pt-20 sm:pt-14"
            btnClassName="top-1 right-4 sm:top-4 sm:right-4"
          >
            <EmployeeProductivity userId={userId} />
          </Modal>
          <Modal
            isOpen={openModal === "salary"}
            onClose={() => setOpenModal(null)}
            classNameWrapper="pt-20 sm:pt-14"
            btnClassName="top-1 right-4 sm:top-4 sm:right-4"
          >
            <EmployeeSalary userId={userId} />
          </Modal>
          <Modal
            isOpen={openModal === "documents"}
            onClose={() => setOpenModal(null)}
            classNameWrapper="pt-20 sm:pt-14"
            btnClassName="top-1 right-4 sm:top-4 sm:right-4"
          >
            <EmployeeDocuments profileId={profileId} />
          </Modal>
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-4 mt-6">
          <div className="bg-gray-100 p-4 rounded-lg">
            <EmployeeProductivity userId={userId} />
          </div>
          <div className="bg-gray-100 p-4 rounded-lg">
            <EmployeeSalary userId={userId} />
          </div>
          <div className="bg-gray-100 p-4 rounded-lg">
            <EmployeeDocuments profileId={profileId} />
          </div>
        </div>
      )}
    </div>
  );
};

export default EmployeeDetails;
