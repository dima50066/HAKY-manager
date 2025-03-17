import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
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
  const { t, i18n } = useTranslation(); // Додаємо `i18n` з `useTranslation`
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
      <h3 className="text-xl font-semibold pb-4">{t("salary_history")}</h3>
      {salaryHistory.length > 0 ? (
        salaryHistory.map((salary) => (
          <Card key={salary._id} variant="outlined" className="mb-4 p-4">
            <CardContent className="space-y-2">
              <Typography variant="body1" className="pb-1">
                <strong>{t("period")}:</strong>{" "}
                {new Date(`${salary.period}-01`).toLocaleDateString(
                  i18n.language,
                  {
                    month: "long",
                    year: "numeric",
                  }
                )}
              </Typography>
              <Typography variant="body1" className="pb-1">
                <strong>{t("hours_worked")}:</strong> {salary.hoursWorked} h
              </Typography>
              <Typography variant="body1" className="flex items-center pb-2">
                <strong>{t("total_earnings")}:</strong>{" "}
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
                {t("edit")}
              </Button>
            </CardContent>
          </Card>
        ))
      ) : (
        <p>{t("no_salary_history")}</p>
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
