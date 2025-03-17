import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";
import { AppDispatch } from "../../redux/store";
import { updateUserSalary } from "../../redux/salary/operations";
import { Salary } from "../../types";
import {
  TextField,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";

interface EditEmployeeSalaryProps {
  userId: string;
  salary: Salary;
  onClose: () => void;
}

const EditEmployeeSalary: React.FC<EditEmployeeSalaryProps> = ({
  userId,
  salary,
  onClose,
}) => {
  const { t } = useTranslation();
  const dispatch = useDispatch<AppDispatch>();

  const [formData, setFormData] = useState({
    additionalHours: salary.hoursWorked || 0,
    recordId: salary._id,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setFormData((prev) => {
      const updatedFormData = {
        ...prev,
        [name]: Number(value),
      };
      return updatedFormData;
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    await dispatch(updateUserSalary({ userId, ...formData }));
    onClose();
  };

  return (
    <Dialog open onClose={onClose}>
      <DialogTitle>{t("edit_salary")}</DialogTitle>
      <DialogContent>
        <TextField
          label={t("additional_hours")}
          name="additionalHours"
          type="number"
          value={formData.additionalHours}
          onChange={handleChange}
          fullWidth
          margin="dense"
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="secondary">
          {t("cancel")}
        </Button>
        <Button onClick={handleSubmit} color="primary">
          {t("save")}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default EditEmployeeSalary;
