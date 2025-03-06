import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchSalaryHistoryById } from "../../redux/salary/operations";
import { selectSalaryHistoryById } from "../../redux/salary/selectors";
import { AppDispatch } from "../../redux/store";
import { Card, CardContent, Typography, Button } from "@mui/material";
import { Salary } from "../../types";
import EditEmployeeSalary from "./EditEmployeeSalary";
import Icon from "../../shared/icon/Icon";

interface EmployeeSalaryProps {
  userId: string;
}

export const EmployeeSalary: React.FC<EmployeeSalaryProps> = ({ userId }) => {
  const dispatch = useDispatch<AppDispatch>();
  const salaryHistory = useSelector(selectSalaryHistoryById(userId));
  const [editingSalary, setEditingSalary] = useState<null | Salary>(null);

  useEffect(() => {
    if (userId) {
      dispatch(fetchSalaryHistoryById(userId));
    }
  }, [dispatch, userId]);

  return (
    <div className="mt-4">
      <h3 className="text-xl font-semibold pb-4">Salary History</h3>
      {salaryHistory.length > 0 ? (
        salaryHistory.map((salary) => (
          <Card key={salary._id} variant="outlined" className="mb-4 p-4">
            {" "}
            <CardContent className="space-y-2">
              {" "}
              <Typography variant="body1" className="pb-1">
                <strong>Period:</strong>{" "}
                {new Date(`${salary.period}-01`).toLocaleDateString("en-US", {
                  month: "long",
                  year: "numeric",
                })}
              </Typography>
              <Typography variant="body1" className="pb-1">
                <strong>Hours Worked:</strong> {salary.hoursWorked} hours
              </Typography>
              <Typography variant="body1" className="flex items-center pb-2">
                <strong>Total Earnings:</strong>{" "}
                {salary.totalEarnings.toFixed(2)} ZLT
                <Icon id="coin" width={16} height={16} className="ml-2" />
              </Typography>
              <Button
                variant="outlined"
                color="primary"
                className="mt-2"
                onClick={() => setEditingSalary(salary)}
              >
                <Icon id="edit" width={16} height={16} className="mr-2" />
                Edit
              </Button>
            </CardContent>
          </Card>
        ))
      ) : (
        <p>No salary history</p>
      )}
      {editingSalary && (
        <EditEmployeeSalary
          userId={userId}
          salary={editingSalary}
          onClose={() => setEditingSalary(null)}
        />
      )}
    </div>
  );
};
