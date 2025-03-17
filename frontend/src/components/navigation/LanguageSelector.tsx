import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useAppDispatch, useAppSelector } from "../../redux/store";
import { updateLanguage } from "../../redux/profile/operations";
import { selectLanguage } from "../../redux/profile/selectors";

const languages = [
  { code: "en", label: "EN" },
  { code: "uk", label: "UA" },
  { code: "pl", label: "PL" },
  { code: "ru", label: "RU" },
];

const LanguageSelector: React.FC = () => {
  const { i18n } = useTranslation();
  const dispatch = useAppDispatch();
  const storedLanguage = useAppSelector(selectLanguage);

  const [selectedLanguage, setSelectedLanguage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (storedLanguage) {
      setSelectedLanguage(storedLanguage);
      i18n.changeLanguage(storedLanguage);
    } else {
      setSelectedLanguage("en");
    }
    setIsLoading(false);
  }, [storedLanguage, i18n]);

  const handleChangeLanguage = (lng: string) => {
    if (!lng || lng === selectedLanguage) return;

    setIsLoading(true);
    i18n.changeLanguage(lng).then(() => {
      dispatch(updateLanguage(lng));
      setSelectedLanguage(lng);
      setIsLoading(false);
    });
  };

  if (isLoading || !selectedLanguage) {
    return <div className="text-white">Loading language...</div>;
  }

  return (
    <div className="relative">
      <select
        value={selectedLanguage}
        onChange={(e) => handleChangeLanguage(e.target.value)}
        className="p-2 border rounded-md bg-gray-800 text-white"
      >
        {languages.map(({ code, label }) => (
          <option key={code} value={code}>
            {label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default LanguageSelector;
