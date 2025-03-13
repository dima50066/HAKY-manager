import React, { useState, useEffect } from "react";
import Profile from "../../components/profile/Profile";
import ProfileUpdateForm from "../../components/profile/ProfileForm";
import DocumentsManager from "../../components/documents/DocumentsManager";
import Modal from "../../shared/modal/Modal";
import * as Popover from "@radix-ui/react-popover";
import Icon from "../../shared/icon/Icon";

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
        <div className="flex mb-4 items-center gap-2">
          <h1 className="text-2xl font-bold text-gray-800">My Profile</h1>
          <Popover.Root>
            <Popover.Trigger asChild>
              <button className="mt-2 w-max p-2 rounded-full bg-gray-200 hover:bg-gray-300 transition-all">
                <Icon
                  id="info"
                  width={20}
                  height={20}
                  className="text-gray-600"
                />
              </button>
            </Popover.Trigger>
            <Popover.Portal>
              <Popover.Content
                side="bottom"
                align="center"
                className="bg-white shadow-xl rounded-lg p-4 w-80 text-sm text-gray-700 border border-gray-200"
              >
                <p className="font-semibold">On this page, you can:</p>
                <ul className="list-disc pl-4 mt-2 space-y-1">
                  <li>
                    Create your profile by adding the necessary information.
                  </li>
                  <li>Your provided details will be used by management.</li>
                  <li>
                    Based on this information and your recorded productivity
                    data, your estimated monthly earnings will be calculated.
                  </li>
                  <li>
                    Upload and manage the necessary work-related documents,
                    which may be accessed by management when needed.
                  </li>
                </ul>
                <Popover.Close className="absolute top-2 right-2 text-gray-500 hover:text-gray-700">
                  ✖
                </Popover.Close>
              </Popover.Content>
            </Popover.Portal>
          </Popover.Root>
        </div>

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
