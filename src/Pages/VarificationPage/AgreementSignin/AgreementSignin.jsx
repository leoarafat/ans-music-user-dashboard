import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import BASEURL from "../../../../Constants";
import axios from "axios";
import toast from "react-hot-toast";
import { ProfileDataContext } from "../../../context/ProfileDataProvider";
import { LabelDataContext } from "../../../context/LabelProvider";

const AgreementSignin = () => {
  const { profileImages } = useContext(ProfileDataContext);
  const { labelImages } = useContext(LabelDataContext);
  const [profileData, setProfileData] = useState(null);
  const [labelData, setLabelData] = useState(null);
  const [selectedProfileImage, setSelectedProfileImage] = useState(null);
  const [selectedNidFront, setSelectedNidFront] = useState(null);
  const [selectedNidBack, setSelectedNidBack] = useState(null);
  const [selectedNoticeImage, setSelectedNoticeImage] = useState(null);
  const [selectedDashboardImage, setSelectedDashboardImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const id = localStorage.getItem("user_id");
  const navigate = useNavigate();
  const formData = new FormData();
  console.log(profileImages, "Arafat");
  useEffect(() => {
    // Retrieve profileData from localStorage
    const storedProfileDataString = localStorage.getItem("profileData");
    const storedLabelDataDataString = localStorage.getItem("labelData");

    // Parse the JSON string back to an object
    const storedProfileData = JSON.parse(storedProfileDataString);
    const storedLabelData = JSON.parse(storedLabelDataDataString);

    // Set storedProfileData into state
    if (storedProfileData) {
      setProfileData(storedProfileData);
    }
    if (storedLabelData) {
      setLabelData(storedLabelData);
    }
    // Retrieve selectedProfileImage from localStorage
    const profileImageURL = localStorage.getItem("selectedProfileImage");
    if (profileImageURL) {
      fetch(profileImageURL)
        .then((res) => res.blob())
        .then((blob) =>
          setSelectedProfileImage(new File([blob], "profileImage"))
        );
    }

    // Retrieve selectedNidFront from localStorage
    const nidFrontImageURL = localStorage.getItem("selectedNidFront");
    if (nidFrontImageURL) {
      fetch(nidFrontImageURL)
        .then((res) => res.blob())
        .then((blob) => setSelectedNidFront(new File([blob], "nidFrontImage")));
    }

    // Retrieve selectedNidBack from localStorage
    const nidBackImageURL = localStorage.getItem("selectedNidBack");
    if (nidBackImageURL) {
      fetch(nidBackImageURL)
        .then((res) => res.blob())
        .then((blob) => setSelectedNidBack(new File([blob], "nidBackImage")));
    }
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

  // ======================================================
  //          Finally Submit All data here
  // ======================================================
  const handleAgreementDone = async () => {
    const data = {
      name: profileData?.name,
      phoneNumber: profileData?.number,
      address: profileData?.address,
      country: profileData?.county,
      state: profileData?.state,
      city: profileData?.city,
      postCode: profileData?.postCode,
      channelName: labelData?.name,
      channelUrl: labelData?.url,
      subscribeCount: labelData?.totalSub,
      videosCount: 50,
      copyrightNotice: "Copyright © 2024 ANS Music",
    };
    if (selectedProfileImage) {
      formData.append("image", profileImages?.selectedProfileImage);
    }
    if (selectedNidFront) {
      formData.append("nidFront", profileImages?.selectedNidFront);
    }
    if (selectedNidBack) {
      formData.append("nidBack", profileImages?.selectedNidBack);
    }
    if (selectedDashboardImage) {
      formData.append(
        "dashboardScreenShot",
        labelImages?.selectedDashboardImage
      );
    }
    if (selectedNoticeImage) {
      formData.append("copyrightNoticeImage", labelImages?.selectedNoticeImage);
    }
    formData.append("data", JSON.stringify(data));

    setLoading(true);
    try {
      const response = await axios.patch(
        `${BASEURL}/user/verify-profile/${id}`,
        formData,
        {
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        }
      );

      toast.success(`${response.data.message}`);
      if (response.data.data.isVerified) {
        localStorage.setItem("isVerified", response.data.data.isVerified);
        // Remove profileData from localStorage
        localStorage.removeItem("profileData");
        localStorage.removeItem("labelData");
        localStorage.removeItem("activeTab");
        localStorage.removeItem("selectedProfileImage");
        localStorage.removeItem("selectedNidFront");
        localStorage.removeItem("selectedNidBack");
        localStorage.removeItem("selectedNoticeImage");
        localStorage.removeItem("selectedDashboardImage");
        navigate("/");
      }
      return response.data;
    } catch (error) {
      console.log(error.response.data);
      toast.error(`${error.response.data.message}`);
      throw new Error(error.response.data.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-5 bg-white shadow-md rounded-md">
      <div className="label_box text-sm font-semibold">
        <h4 className="p-3 font-semibold text-[#0B5119] bg-[#F7FEF8] text-base rounded">
          Account Details
        </h4>
        <div className="grid grid-cols-8 gap-4 ml-3 my-3">
          <div className="col-span-2 flex flex-col gap-3 text-[#94A3B8] ">
            <p>Names : </p>
            <p>Email : </p>
            <p>Phone : </p>
          </div>
          <div className="col-span-6 flex flex-col gap-3 ">
            <p>{profileData?.name ? `${profileData?.name}` : "N/A"}</p>
            <p>{profileData?.email ? `${profileData?.email}` : "N/A"}</p>
            <p>{profileData?.number ? `${profileData?.number}` : "N/A"} </p>
          </div>
        </div>
      </div>
      <div className="label_box text-sm font-semibold">
        <h4 className="p-3 font-semibold text-[#0B5119] bg-[#F7FEF8] text-base rounded">
          Address Details
        </h4>
        <div className="grid grid-cols-8 gap-4 ml-3 my-3">
          <div className="col-span-2 flex flex-col gap-3 text-[#94A3B8] ">
            <p>Address : </p>
            <p>City :</p>
            <p>State :</p>
            <p>Country :</p>
            <p>Post Code :</p>
          </div>
          <div className="col-span-6 flex flex-col gap-3 ">
            <p>{profileData?.address ? `${profileData?.address}` : "N/A"}</p>
            <p>{profileData?.city ? `${profileData?.city}` : "N/A"}</p>
            <p>{profileData?.state ? `${profileData?.state}` : "N/A"}</p>
            <p>{profileData?.country ? `${profileData?.country}` : "N/A"}</p>
            <p>{profileData?.postCode ? `${profileData?.postCode}` : "N/A"}</p>
          </div>
        </div>
      </div>
      <div className="label_box text-sm font-semibold">
        <h4 className="p-3 font-semibold text-[#0B5119] bg-[#F7FEF8] text-base rounded">
          Label Details
        </h4>
        <div className="grid grid-cols-8 gap-4 ml-3 my-3">
          <div className="col-span-2 flex flex-col gap-3 text-[#94A3B8] ">
            <p>Label Names : </p>
            <p>Total Subscriber : </p>
            <p>Youtube Channel Link : </p>
          </div>
          <div className="col-span-6 flex flex-col gap-3 ">
            <p>{labelData?.name ? `${labelData?.name}` : "N/A"}</p>
            <p className=" w-full">
              {labelData?.totalSub ? `${labelData?.totalSub}` : "N/A"}
            </p>
            <p className="text-blue-500 w-full">
              {labelData?.url ? `${labelData?.url}` : "N/A"}
            </p>
          </div>
        </div>
      </div>
      <div className="label_box text-sm font-semibold">
        <h4 className="p-3 font-semibold text-[#0B5119] bg-[#F7FEF8] text-base rounded">
          Document Details
        </h4>
        <div className="grid grid-cols-5 gap-5  p-6">
          <div className="img">
            {selectedProfileImage ? (
              <img
                src={URL.createObjectURL(selectedProfileImage)}
                alt="Selected Profile"
                className="w-full h-auto"
              />
            ) : (
              <p>Img not found</p>
            )}
          </div>
          <div className="img">
            {selectedNidFront ? (
              <img
                src={URL.createObjectURL(selectedNidFront)}
                alt="Selected Profile"
                className="w-full h-auto"
              />
            ) : (
              <p>Img not found</p>
            )}
          </div>
          <div className="img">
            {selectedNidBack ? (
              <img
                src={URL.createObjectURL(selectedNidBack)}
                alt="Selected Profile"
                className="w-full h-auto"
              />
            ) : (
              <p>Img not found</p>
            )}
          </div>
          <div className="img">
            {selectedNoticeImage ? (
              <img
                src={URL.createObjectURL(selectedNoticeImage)}
                alt="Selected Profile"
                className="w-full h-auto"
              />
            ) : (
              <p>Img not found</p>
            )}
          </div>
          <div className="img">
            {selectedDashboardImage ? (
              <img
                src={URL.createObjectURL(selectedDashboardImage)}
                alt="Selected Profile"
                className="w-full h-auto"
              />
            ) : (
              <p>Img not found</p>
            )}
          </div>
        </div>
      </div>

      <div className="button mt-5 flex items-center justify-end">
        {/* Conditionally render loader when loading state is true */}
        {loading ? (
          <div className="loader">Loading...</div>
        ) : (
          <button
            onClick={handleAgreementDone}
            className="btn bg-[#199332] btn-success text-white"
            type="button"
          >
            Verify Now
          </button>
        )}
      </div>
    </div>
  );
};

export default AgreementSignin;
