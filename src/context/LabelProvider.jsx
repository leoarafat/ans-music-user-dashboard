import { createContext, useState } from "react";

export const LabelDataContext = createContext();

export const LabelDataProvider = ({ children }) => {
  const [labelData, setLabelData] = useState(null);
  const [labelImages, setLabelImages] = useState({
    selectedDashboardImage: null,
    selectedNoticeImage: null,
  });

  const updateLabelData = (data) => {
    setLabelData(data);
  };

  // const updateLabelImages = (images) => {
  //   setLabelImages(images);
  // };
  const updateLabelImages = (images) => {
    setLabelImages((prevImages) => ({
      ...prevImages,
      ...images,
    }));
  };

  return (
    <LabelDataContext.Provider
      value={{
        labelData,
        labelImages,
        updateLabelData,
        updateLabelImages,
      }}
    >
      {children}
    </LabelDataContext.Provider>
  );
};
