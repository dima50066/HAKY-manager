import React, { useState } from "react";
import Profile from "../../components/profile/Profile";
import ProfileUpdateForm from "../../components/profile/ProfileForm";

const ProfilePage: React.FC = () => {
  const [isFormVisible, setIsFormVisible] = useState(false);

  const toggleFormVisibility = () => {
    setIsFormVisible((prev) => !prev);
  };

  return (
    <div className="min-h-screen bg-gray-100 py-12">
      <div className="max-w-2xl mx-auto bg-white p-10 shadow-lg rounded-lg">
        <h1 className="text-3xl font-semibold text-center text-blue-600 mb-12">
          My Profile
        </h1>

        <div className="mb-12">
          <Profile />
        </div>

        <div className="border-t pt-10">
          <button
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition"
            onClick={toggleFormVisibility}
          >
            {isFormVisible ? "Hide Update Form" : "Show Update Form"}
          </button>

          {isFormVisible && (
            <div className="mt-6 transition-all duration-500 ease-in-out">
              <ProfileUpdateForm />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
