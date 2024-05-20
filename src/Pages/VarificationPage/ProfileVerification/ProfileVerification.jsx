import React, { useContext, useEffect, useState } from "react";
import { MdOutlineFileUpload, MdClose } from "react-icons/md";
import { AuthContext } from "../../../context/AuthProvider";
import { ProfileDataContext } from "../../../context/ProfileDataProvider";

const ProfileVerification = ({ handleTabChange }) => {
  const { userData } = useContext(AuthContext);
  const { updateProfileImages, profileImages } = useContext(ProfileDataContext);
  const [selectedProfileImage, setSelectedProfileImage] = useState(null);
  const [selectedNidFront, setSelectedNidFront] = useState(null);
  const [selectedNidBack, setSelectedNidBack] = useState(null);
  const storedProfileDataString = localStorage.getItem("profileData");
  const storedProfileData = JSON.parse(storedProfileDataString);
  // console.log(userData);
  useEffect(() => {
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
  }, []);

  const handleProfileImageUpload = (event) => {
    const file = event.target.files[0];
    setSelectedProfileImage(file);
    localStorage.setItem("selectedProfileImage", URL.createObjectURL(file));
  };
  const handleNidFrontUpload = (event) => {
    const file = event.target.files[0];
    setSelectedNidFront(file);
    localStorage.setItem("selectedNidFront", URL.createObjectURL(file));
  };
  const handleNidBackUpload = (event) => {
    const file = event.target.files[0];
    setSelectedNidBack(file);
    localStorage.setItem("selectedNidBack", URL.createObjectURL(file));
  };

  const handleProfileRemoveImage = () => {
    setSelectedProfileImage(null);
    localStorage.removeItem("selectedProfileImage");
  };
  const handleNidFrontRemove = () => {
    setSelectedNidFront(null);
    localStorage.removeItem("selectedNidFront");
  };
  const handleNidBackRemove = () => {
    setSelectedNidBack(null);
    localStorage.removeItem("selectedNidBack");
  };

  // This is main Funtion redirect for this page ================

  const handleProfileVerify = (e) => {
    e.preventDefault();
    const form = e.target;
    const name = form.name.value;
    const email = form.email.value;
    const number = form.number.value;
    const county = form.county.value;
    const state = form.state.value;
    const city = form.city.value;
    const address = form.address.value;
    const postCode = form.post_code.value;

    const profileData = {
      // profileImg: selectedProfileImage,
      // NidFront: selectedNidFront,
      // NidBack: selectedNidBack,
      name,
      email,
      number,
      county,
      state,
      city,
      address,
      postCode,
    };
    // Convert profileData to JSON string
    const profileDataString = JSON.stringify(profileData);

    // Save profileData to localStorage
    localStorage.setItem("profileData", profileDataString);
    updateProfileImages({
      selectedProfileImage,
      selectedNidFront,
      selectedNidBack,
    });

    handleTabChange(2);
  };
  // console.log(selectedProfileImage);
  return (
    <div className="mt-2">
      <form
        onSubmit={handleProfileVerify}
        className="account_verification bg-white shadow-md p-5 rounded-md"
      >
        <h2 className="text-xl font-semibold my-3">1. Account Information</h2>
        <div className="image_upload grid grid-cols-3 gap-8">
          {/* Upload user profile  */}
          <div className="image_upload flex items-center justify-center flex-col">
            <h4 className="mb-2 text-sm font-semibold">
              Upload Profile picture
            </h4>
            {selectedProfileImage ? (
              <div className="relative w-3/4">
                <img
                  src={URL.createObjectURL(selectedProfileImage)}
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
                htmlFor="file-upload"
                className="upload w-3/4 hover:bg-green-100 transition flex justify-center shadow-md rounded-md p-12 text-5xl cursor-pointer"
              >
                <input
                  id="file-upload"
                  type="file"
                  accept="image/*"
                  name="image"
                  style={{ display: "none" }}
                  onChange={handleProfileImageUpload}
                />
                <MdOutlineFileUpload />
              </label>
            )}
          </div>

          {/* Upload user NID Front  */}
          <div className="image_upload flex items-center justify-center flex-col">
            <h4 className="mb-2 text-sm font-semibold">Upload Nid Front</h4>
            {selectedNidFront ? (
              <div className="relative w-3/4">
                <img
                  src={URL.createObjectURL(selectedNidFront)}
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
                htmlFor="nid-front"
                className="upload w-3/4 hover:bg-green-100 transition flex justify-center shadow-md rounded-md p-12 text-5xl cursor-pointer"
              >
                <input
                  id="nid-front"
                  type="file"
                  accept="image/*"
                  name="nidFront"
                  style={{ display: "none" }}
                  onChange={handleNidFrontUpload}
                />
                <MdOutlineFileUpload />
              </label>
            )}
          </div>
          {/* Upload user Nid Back  */}
          <div className="image_upload flex items-center justify-center flex-col">
            <h4 className="mb-2 text-sm font-semibold">Upload Nid Back</h4>
            {selectedNidBack ? (
              <div className="relative w-3/4">
                <img
                  src={URL.createObjectURL(selectedNidBack)}
                  alt="Selected Profile"
                  className="w-full h-auto"
                />
                <button
                  className="absolute top-0 right-0 bg-red-500 text-white rounded-full p-1"
                  onClick={handleNidBackRemove}
                >
                  <MdClose />
                </button>
              </div>
            ) : (
              <label
                htmlFor="nid-back"
                className="upload w-3/4 hover:bg-green-100 transition flex justify-center shadow-md rounded-md p-12 text-5xl cursor-pointer"
              >
                <input
                  id="nid-back"
                  type="file"
                  accept="image/*"
                  name="nidBack"
                  style={{ display: "none" }}
                  onChange={handleNidBackUpload}
                />
                <MdOutlineFileUpload />
              </label>
            )}
          </div>
        </div>
        <div className="input_div grid grid-cols-2 gap-5 my-3 p-8">
          <label className="form-control w-full">
            <span className="text-sm font-semibold mb-2">Name</span>
            <input
              name="name"
              defaultValue={
                storedProfileData?.name
                  ? storedProfileData?.name
                  : userData?.data?.name
              }
              type="text"
              placeholder="Enter name"
              className="input  w-full bg-[#F7FEF8]"
            />
          </label>
          <label className="form-control w-full">
            <span className="text-sm font-semibold mb-2">Phone number</span>
            <input
              name="number"
              defaultValue={storedProfileData?.number}
              type="text"
              placeholder="Enter Phone number"
              className="input  w-full bg-[#F7FEF8]"
            />
          </label>
          <label className="form-control w-full">
            <span className="text-sm font-semibold mb-2">Email</span>
            <input
              name="email"
              readOnly
              value={userData?.data?.email}
              type="email"
              placeholder="Enter name"
              className="input  w-full bg-[#F7FEF8]"
            />
          </label>
        </div>
        <h2 className="text-xl font-semibold">2. Address Information</h2>
        <div className="input_div grid grid-cols-2 gap-5 p-5">
          <label className="form-control w-full">
            <span className="text-sm font-semibold mb-2">
              County <span className="text-red-500">*</span>
            </span>
            <select name="county" className="select  w-full bg-[#F7FEF8]">
              <option disabled selected>
                Bangladesh
              </option>
              <option>India</option>
              <option>USA</option>
            </select>
          </label>
          <label className="form-control w-full">
            <span className="text-sm font-semibold mb-2">
              State <span className="text-red-500">*</span>
            </span>
            {/* <select name="state" className="select  w-full bg-[#F7FEF8]">
              <option disabled selected>
                select state
              </option>
              <option>India</option>
              <option>USA</option>
            </select> */}
            <input
              type="text"
              className="input  w-full bg-[#F7FEF8]"
              name="state"
              id=""
            />
          </label>
          <label className="form-control w-full">
            <span className="text-sm font-semibold mb-2">
              City<span className="text-red-500">*</span>
            </span>
            <input
              name="city"
              defaultValue={storedProfileData?.city}
              type="text"
              placeholder="Enter city"
              className="input  w-full bg-[#F7FEF8]"
            />
          </label>
          <label className="form-control w-full">
            <span className="text-sm font-semibold mb-2">
              Post Code<span className="text-red-500">*</span>
            </span>
            <input
              name="post_code"
              defaultValue={storedProfileData?.postCode}
              type="text"
              placeholder="Enter Post Code"
              className="input  w-full bg-[#F7FEF8]"
            />
          </label>
          <label className="form-control w-full">
            <span className="text-sm font-semibold mb-2">
              Address<span className="text-red-500">*</span>
            </span>
            <input
              name="address"
              defaultValue={storedProfileData?.address}
              type="text"
              placeholder="Enter Address"
              className="input  w-full bg-[#F7FEF8]"
            />
          </label>
          <div className="button flex justify-end items-end">
            {/* <button
              onClick={handleProfileVerify}
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
      <div className="hidden"></div>
    </div>
  );
};

export default ProfileVerification;
