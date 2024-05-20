import { createContext, useState } from "react";

export const ProfileDataContext = createContext();

export const ProfileDataProvider = ({ children }) => {
  const [profileData, setProfileData] = useState(null);
  const [profileImages, setProfileImages] = useState({
    selectedProfileImage: null,
    selectedNidFront: null,
    selectedNidBack: null,
    selectedDashboardImage: null,
    selectedNoticeImage: null,
  });

  const updateProfileData = (data) => {
    setProfileData(data);
  };

  const updateProfileImages = (images) => {
    setProfileImages(images);
  };

  return (
    <ProfileDataContext.Provider
      value={{
        profileData,
        profileImages,
        updateProfileData,
        updateProfileImages,
      }}
    >
      {children}
    </ProfileDataContext.Provider>
  );
};
