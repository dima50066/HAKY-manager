import React, { useState, useEffect } from "react";
import Profile from "../../components/profile/Profile";
import ProfileUpdateForm from "../../components/profile/ProfileForm";
import DocumentsManager from "../../components/documents/DocumentsManager";
import Modal from "../../shared/modal/Modal";

const ProfilePage: React.FC = () => {
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [isDocumentsVisible, setIsDocumentsVisible] = useState(false);
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => setScreenWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const isLargeScreen = screenWidth >= 1024;
  const isTablet = screenWidth >= 768 && screenWidth < 1024;

  return (
    <div className="min-h-screen bg-gray-100 py-6 px-4 md:px-8 lg:px-12 flex flex-col md:flex-row gap-4 md:gap-6 items-start">
      <div
        className={`w-full ${
          isTablet ? "w-full" : "md:w-1/2"
        } lg:w-1/3 flex flex-col`}
      >
        <Profile onEdit={() => setIsFormVisible(true)} />
        {!isLargeScreen && (
          <button
            className="mt-4 w-full bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition"
            onClick={() => setIsDocumentsVisible(true)}
          >
            Manage Documents
          </button>
        )}
      </div>

      <div
        className={`w-full ${
          isTablet ? "w-full" : "md:w-1/2"
        } lg:w-2/3 flex flex-col`}
      >
        {isLargeScreen ? (
          <div className="h-full flex flex-col justify-start">
            <DocumentsManager />
          </div>
        ) : (
          <Modal
            isOpen={isDocumentsVisible}
            onClose={() => setIsDocumentsVisible(false)}
          >
            <DocumentsManager />
          </Modal>
        )}
      </div>

      <Modal
        isOpen={isFormVisible}
        onClose={() => setIsFormVisible(false)}
        classNameWrapper={
          isLargeScreen
            ? "max-w-5xl max-h-[100vh]"
            : isTablet
            ? "max-w-3xl max-h-[100vh]"
            : "max-w-md max-h-screen"
        }
      >
        <ProfileUpdateForm onClose={() => setIsFormVisible(false)} />
      </Modal>
    </div>
  );
};

export default ProfilePage;
