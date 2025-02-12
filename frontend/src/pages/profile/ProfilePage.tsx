import React, { useState } from "react";
import Profile from "../../components/profile/Profile";
import ProfileUpdateForm from "../../components/profile/ProfileForm";
import DocumentsManager from "../../components/documents/DocumentsManager";

const ProfilePage: React.FC = () => {
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [isDocumentsVisible, setIsDocumentsVisible] = useState(false);

  const toggleFormVisibility = () => {
    setIsFormVisible((prev) => !prev);
  };

  const toggleDocumentsVisibility = () => {
    setIsDocumentsVisible((prev) => !prev);
  };

  const closeForm = () => {
    setIsFormVisible(false);
  };

  return (
    <div className="min-h-screen bg-gray-100 py-12">
      <div className="max-w-2xl mx-auto bg-white p-10 shadow-lg rounded-lg">
        <div className="mb-12">
          <Profile />
        </div>

        <div className="border-t pt-10">
          <button
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition mr-4"
            onClick={toggleFormVisibility}
          >
            {isFormVisible ? "Hide Update Form" : "Show Update Form"}
          </button>
          <button
            className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition"
            onClick={toggleDocumentsVisibility}
          >
            {isDocumentsVisible ? "Hide Documents" : "Manage Documents"}
          </button>

          {isFormVisible && (
            <div className="mt-6 transition-all duration-500 ease-in-out">
              <ProfileUpdateForm onClose={closeForm} />
            </div>
          )}

          {isDocumentsVisible && (
            <div className="mt-12 transition-all duration-500 ease-in-out">
              <DocumentsManager />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
