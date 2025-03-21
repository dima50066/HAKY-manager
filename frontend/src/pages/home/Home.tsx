import { useTranslation } from "react-i18next";

const HomePage = () => {
  const { t } = useTranslation();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[#121826] p-6 text-white">
      <h1 className="text-3xl md:text-5xl font-bold text-[#4CAF50] mb-6 text-center">
        {t("welcome")}
      </h1>
      <p className="text-base md:text-lg text-gray-300 mb-10 max-w-2xl text-center">
        {t("description")}
      </p>
      <div className="flex flex-col md:flex-row gap-4 w-full md:w-auto">
        <a
          href="/productivity"
          className="px-6 py-3 text-white bg-[#4CAF50] hover:bg-[#45A049] rounded-lg transition duration-200 w-full md:w-auto text-center text-lg font-medium"
        >
          {t("track_productivity")}
        </a>
        <a
          href="/profile"
          className="px-6 py-3 text-white bg-[#1E88E5] hover:bg-[#1976D2] rounded-lg transition duration-200 w-full md:w-auto text-center text-lg font-medium"
        >
          {t("view_profile")}
        </a>
      </div>
    </div>
  );
};

export default HomePage;
