import { createContext, useState } from "react";

export const ProfileDataContext = createContext();

export const ProfileDataProvider = ({ children }) => {
  const [profileData, setProfileData] = useState(null);
  const [profileImages, setProfileImages] = useState({
    selectedProfileImage: null,
    selectedNidFront: null,
    selectedNidBack: null,
  });

  const updateProfileData = (data) => {
    setProfileData(data);
  };

  // const updateProfileImages = (images) => {
  //   setProfileImages(images);
  // };
  const updateProfileImages = (images) => {
    setProfileImages((prevImages) => ({
      ...prevImages,
      ...images,
    }));
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
