import React, { useContext, useEffect, useState } from "react";
import { MdOutlineFileUpload, MdClose } from "react-icons/md";

import { LabelDataContext } from "../../../context/LabelProvider";

const LebelVerification = ({ handleTabChange }) => {
  const { updateLabelImages } = useContext(LabelDataContext);
  const [selectedNoticeImage, setSelectedNoticeImage] = useState(null);
  const [selectedDashboardImage, setSelectedDashboardImage] = useState(null);
  const storedLabelDataDataString = localStorage.getItem("labelData");
  const storedLabelData = JSON.parse(storedLabelDataDataString);

  useEffect(() => {
    // Retrieve selectedNoticeImage from localStorage
    const selectedNoticeImageURL = localStorage.getItem("selectedNoticeImage");
    if (selectedNoticeImageURL) {
      fetch(selectedNoticeImageURL)
        .then((res) => res.blob())
        .then((blob) =>
          setSelectedNoticeImage(new File([blob], "selectedNoticeImage"))
        );
    }

    // Retrieve selectedDashboardImage from localStorage
    const selectedDashboardImageURL = localStorage.getItem(
      "selectedDashboardImage"
    );
    if (selectedDashboardImageURL) {
      fetch(selectedDashboardImageURL)
        .then((res) => res.blob())
        .then((blob) =>
          setSelectedDashboardImage(new File([blob], "selectedDashboardImage"))
        );
    }
  }, []);

  const handleselectedNoticeImageUpload = (event) => {
    const file = event.target.files[0];
    setSelectedNoticeImage(file);
    localStorage.setItem("selectedNoticeImage", URL.createObjectURL(file));
  };
  const handleNidFrontUpload = (event) => {
    const file = event.target.files[0];
    setSelectedDashboardImage(file);
    localStorage.setItem("selectedDashboardImage", URL.createObjectURL(file));
  };

  const handleProfileRemoveImage = () => {
    setSelectedNoticeImage(null);
    localStorage.removeItem("selectedNoticeImage");
  };
  const handleNidFrontRemove = () => {
    setSelectedDashboardImage(null);
    localStorage.removeItem("selectedDashboardImage");
  };

  const handleLabelVerify = (e) => {
    e.preventDefault();
    const form = e.target;
    const name = form.name.value;
    const url = form.url.value;
    const totalSub = form.total_sub.value;
    const labelData = {
      copyRightImg: selectedNoticeImage,
      dashBoardImg: selectedDashboardImage,
      name,
      url,
      totalSub,
    };
    // Convert labelData to JSON string
    const labelDataString = JSON.stringify(labelData);

    // Save labelData to localStorage
    localStorage.setItem("labelData", labelDataString);
    updateLabelImages({
      selectedDashboardImage,
      selectedNoticeImage,
    });
    handleTabChange(3);
  };

  // console.log(storedLabelData);
  return (
    <form onSubmit={handleLabelVerify} className="mt-2">
      <div className="account_verification bg-white shadow-md p-5 rounded-md">
        <h2 className="text-xl font-semibold my-3">
          1. Youtube Channel Details
        </h2>

        <div className="input_div grid grid-cols-2 gap-5 my-3 p-8">
          <label className="form-control w-full">
            <span className="text-sm font-semibold mb-2">Channel Name </span>
            <input
              name="name"
              defaultValue={storedLabelData?.name}
              type="text"
              placeholder="Enter Channel name"
              className="input  w-full bg-[#F7FEF8]"
              required
            />
          </label>
          <label className="form-control w-full">
            <span className="text-sm font-semibold mb-2">Channel URL</span>
            <input
              name="url"
              defaultValue={storedLabelData?.url}
              type="url"
              placeholder="Enter Channel URL"
              className="input  w-full bg-[#F7FEF8]"
              required
            />
          </label>
          <label className="form-control w-full">
            <span className="text-sm font-semibold mb-2">Total Subscriber</span>
            <input
              name="total_sub"
              defaultValue={storedLabelData?.totalSub}
              type="number"
              placeholder="Total Subscriber"
              className="input  w-full bg-[#F7FEF8]"
              required
            />
          </label>
        </div>
        <h2 className="text-xl font-semibold">
          2. Youtube Channel Screenshots
        </h2>
        <div className="image_upload grid grid-cols-2 gap-8 my-8">
          {/* Upload user profile  */}
          <div className="image_upload flex items-center justify-center flex-col">
            <h4 className="mb-2 text-sm font-semibold">
              Copyright notice screenshot
            </h4>
            {selectedNoticeImage ? (
              <div className="relative w-3/4">
                <img
                  src={URL.createObjectURL(selectedNoticeImage)}
                  alt="Selected Profile"
                  className="w-full h-auto"
                />
                <button
                  className="absolute top-0 right-0 bg-red-500 text-white rounded-full p-1"
                  onClick={handleProfileRemoveImage}
                >
                  <MdClose />
                </button>
              </div>
            ) : (
              <label
                htmlFor="copyright-image"
                className="upload w-full hover:bg-green-100 transition flex justify-center shadow-md rounded-md p-12 text-5xl cursor-pointer"
              >
                <input
                  id="copyright-image"
                  type="file"
                  accept="image/*"
                  style={{ display: "none" }}
                  name="copyrightNoticeImage"
                  onChange={handleselectedNoticeImageUpload}
                />
                <MdOutlineFileUpload />
              </label>
            )}
          </div>

          {/* Upload user NID Front  */}
          <div className="image_upload flex items-center justify-center flex-col">
            <h4 className="mb-2 text-sm font-semibold">Dashboard Screenshot</h4>
            {selectedDashboardImage ? (
              <div className="relative w-3/4">
                <img
                  src={URL.createObjectURL(selectedDashboardImage)}
                  alt="Selected Profile"
                  className="w-full h-auto"
                />
                <button
                  className="absolute top-0 right-0 bg-red-500 text-white rounded-full p-1"
                  onClick={handleNidFrontRemove}
                >
                  <MdClose />
                </button>
              </div>
            ) : (
              <label
                htmlFor="dashboard-screenshot"
                className="upload w-full hover:bg-green-100 transition flex justify-center shadow-md rounded-md p-12 text-5xl cursor-pointer"
              >
                <input
                  id="dashboard-screenshot"
                  type="file"
                  accept="image/*"
                  name="dashboardScreenShot"
                  style={{ display: "none" }}
                  onChange={handleNidFrontUpload}
                />
                <MdOutlineFileUpload />
              </label>
            )}
          </div>
          {/* <div className="image_upload flex items-center justify-center flex-col ">
            <h4 className="mb-2 text-sm font-semibold">
            Copyright notice screenshot
            </h4>
            <button className="upload w-full flex justify-center shadow-md rounded-md p-12 text-5xl cursor-pointer">
              <MdOutlineFileUpload />
            </button>
          </div>
          <div className="image_upload flex items-center justify-center flex-col ">
            <h4 className="mb-2 text-sm font-semibold">Dashboard Screenshot</h4>
            <button className="upload w-full flex justify-center shadow-md rounded-md p-12 text-5xl cursor-pointer">
              <MdOutlineFileUpload />
            </button>
          </div> */}
        </div>
        <div className="button flex justify-end items-end">
          {/* <button
            onClick={handleLabelVerify}
              type="button"
              className="text-white btn-sm bg-[#199332] px-10 shadow btn btn-success"
            >
              Next
            </button> */}
          <input
            type="submit"
            value="Next"
            className="text-white btn-sm bg-[#199332] px-10 shadow btn btn-success"
          />
        </div>
      </div>
    </form>
  );
};

export default LebelVerification;
