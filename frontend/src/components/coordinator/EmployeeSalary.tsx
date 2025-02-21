import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchSalaryHistoryById } from "../../redux/salary/operations";
import { selectSalaryHistoryById } from "../../redux/salary/selectors";
import { AppDispatch } from "../../redux/store";
import { Card, CardContent, Typography, Button } from "@mui/material";
import { Salary } from "../../types";
import EditEmployeeSalary from "./EditEmployeeSalary";

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
      <h3 className="text-xl font-semibold">Salary History</h3>
      {salaryHistory.length > 0 ? (
        salaryHistory.map((salary) => (
          <Card key={salary._id} variant="outlined" className="mb-2">
            <CardContent>
              <Typography variant="body1">
                <strong>Period:</strong>{" "}
                {new Date(`${salary.period}-01`).toLocaleDateString("en-US", {
                  month: "long",
                  year: "numeric",
                })}
              </Typography>
              <Typography variant="body1">
                <strong>Total Earnings:</strong> $
                {salary.totalEarnings.toFixed(2)}
              </Typography>
              <Button
                variant="outlined"
                color="primary"
                onClick={() => setEditingSalary(salary)}
              >
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
