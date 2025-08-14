import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { AppDispatch } from "../../redux/store";
import {
  fetchEmployeeById,
  updateEmployee,
} from "../../redux/coordinator/operations";
import { selectEmployeeById } from "../../redux/coordinator/selectors";
import { TextField, Button, FormControlLabel, Switch } from "@mui/material";

interface EditEmployeeProps {
  profileId: string;
  onClose: () => void;
}

const EditEmployee: React.FC<EditEmployeeProps> = ({ profileId, onClose }) => {
  const { t } = useTranslation();
  const dispatch = useDispatch<AppDispatch>();
  const employee = useSelector(selectEmployeeById(profileId));

  const [formData, setFormData] = useState({
    birthDate: "",
    location: "",
    address: "",
    isStudent: false,
    livesIndependently: false,
    usesCompanyTransport: false,
    productivity: 0,
    peselNumber: "",
    emergencyContactNumber: "",
    contactNumber: "",
  });

  useEffect(() => {
    if (profileId && !employee) {
      dispatch(fetchEmployeeById(profileId));
    }
  }, [dispatch, profileId, employee]);

  useEffect(() => {
    if (employee) {
      setFormData({
        birthDate: employee.birthDate ? employee.birthDate.split("T")[0] : "",
        location: employee.location || "",
        address: employee.address || "",
        isStudent: employee.isStudent || false,
        livesIndependently: employee.livesIndependently || false,
        usesCompanyTransport: employee.usesCompanyTransport || false,
        productivity: employee.productivity || 0,
        peselNumber: employee.peselNumber || "",
        emergencyContactNumber: employee.emergencyContactNumber || "",
        contactNumber: employee.contactNumber || "",
      });
    }
  }, [employee]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "number" ? Number(value) : value,
    }));
  };

  const handleSwitchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setFormData((prev) => ({ ...prev, [name]: checked }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await dispatch(updateEmployee({ profileId, updates: formData }));
    onClose();
  };

  return (
    <div className="p-6 bg-white rounded-lg max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold mb-4 text-center">
        {t("edit_employee")}
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <TextField
            label={t("birth_date")}
            name="birthDate"
            type="date"
            value={formData.birthDate}
            onChange={handleChange}
            fullWidth
          />
          <TextField
            label={t("location")}
            name="location"
            value={formData.location}
            onChange={handleChange}
            fullWidth
          />
          <TextField
            label={t("address")}
            name="address"
            value={formData.address}
            onChange={handleChange}
            fullWidth
          />
          <TextField
            label={t("pesel_number")}
            name="peselNumber"
            value={formData.peselNumber}
            onChange={handleChange}
            fullWidth
          />
          <TextField
            label={t("emergency_contact")}
            name="emergencyContactNumber"
            value={formData.emergencyContactNumber}
            onChange={handleChange}
            fullWidth
          />
          <TextField
            label={t("contact_number")}
            name="contactNumber"
            value={formData.contactNumber}
            onChange={handleChange}
            fullWidth
          />
          <TextField
            label={t("productivity")}
            name="productivity"
            type="number"
            value={formData.productivity}
            onChange={handleChange}
            fullWidth
          />
        </div>

        <div className="flex-row justify-between mt-2">
          <FormControlLabel
            control={
              <Switch
                checked={formData.isStudent}
                onChange={handleSwitchChange}
                name="isStudent"
              />
            }
            label={t("is_student")}
          />
          <FormControlLabel
            control={
              <Switch
                checked={formData.livesIndependently}
                onChange={handleSwitchChange}
                name="livesIndependently"
              />
            }
            label={t("lives_independently")}
          />
          <FormControlLabel
            control={
              <Switch
                checked={formData.usesCompanyTransport}
                onChange={handleSwitchChange}
                name="usesCompanyTransport"
              />
            }
            label={t("uses_company_transport")}
          />
        </div>

        <div className="flex justify-end space-x-4 mt-4">
          <Button variant="contained" color="primary" type="submit">
            {t("save")}
          </Button>
          <Button variant="outlined" color="secondary" onClick={onClose}>
            {t("cancel")}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default EditEmployee;
