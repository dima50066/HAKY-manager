import React from "react";
import EmployeesList from "../../components/coordinator/EmployeesList";

const CoordinatorPage: React.FC = () => {
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold text-center">Coordinator Dashboard</h1>
      <EmployeesList />
    </div>
  );
};

export default CoordinatorPage;
