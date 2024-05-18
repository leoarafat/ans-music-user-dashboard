import React, { useState } from "react";
import logo from "../../assets/logo/logo-main.png";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import BASEURL from "../../../Constants";
import toast from "react-hot-toast";
const Profile = ({profileData}) => {
  const [formData, setFormData] = useState({
    name: profileData.name,
    email: profileData.email,
    address: profileData.address,
    phoneNumber: profileData.phoneNumber,
  });
  const id = localStorage.getItem("user_id");

    console.log(profileData)
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleImageChange = (e) => {
    setFormData({
      ...formData,
      profileImage: e.target.files[0],
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
      const formDataToSend = new FormData();
      // formDataToSend.append("name", formData.name);
      // formDataToSend.append("username", formData.username);
      // formDataToSend.append("email", formData.email);
      // formDataToSend.append("address", formData.address);
      // formDataToSend.append("phoneNumber", formData.phoneNumber);
      // formDataToSend.append("profileImage", formData.profileImage);
const data = {
  name: formData.name,
  email: formData.email,
  phoneNumber: formData.phoneNumber,
  address: formData.address,
}
formDataToSend.append("data",  JSON.stringify(data));
// if(formData.profileImage){
//   formDataToSend.append("image", formData.profileImage);
// }
     try {
      const response = await axios.patch(`${BASEURL}/user/edit-profile/${id}`, formDataToSend,
      {
        headers: {
          // Accept: "application/json",
          // "Content-Type": "application/json",
          Authorization: localStorage.getItem("token"),
        },
      }
      );
      toast.success(`${response.data.message}`, {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      console.log(response.data)
      return response.data;
    } catch (error) {
      toast.error(`${error.response.data.message}`, {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });

      console.log(error.response.data);
      throw new Error(error.response.data.message);
    }
  };

  return (
    <div className="bg-white p-5 m-5 grid grid-cols-5 gap-5">
      <div className="profile-image col-span-1">
        <label htmlFor="profile-image-upload" className="cursor-pointer">
          <img
            src={
              formData.profileImage
                ? URL.createObjectURL(formData.profileImage)
                : logo
            }
            alt="Profile"
          />
          <input
            type="file"
            id="profile-image-upload"
            accept="image/*"
            style={{ display: "none" }}
            onChange={handleImageChange}
          />
        </label>
      </div>
      <div className="profile-form w-full col-span-4">
        <form className="grid grid-cols-2 gap-5" onSubmit={handleSubmit}>
          <div className="w-full">
            <label className="me-5" htmlFor="your_name">
              Your Name
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              placeholder="Type here"
              className="input input-bordered w-full"
              onChange={handleInputChange}
            />
          </div>
          <div className="w-full">
            <label className="me-5" htmlFor="your_email">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              placeholder="Type here"
              className="input input-bordered w-full"
              onChange={handleInputChange}
            />
          </div>
          <div className="w-full">
            <label className="me-5" htmlFor="your_address">
              Address
            </label>
            <input
              type="text"
              name="address"
              value={formData.address}
              placeholder="Type here"
              className="input input-bordered w-full"
              onChange={handleInputChange}
            />
          </div>
          <div className="w-full">
            <label className="me-5" htmlFor="your_phone_number">
              Phone Number
            </label>
            <input
              type="tel"
              name="phoneNumber"
              value={formData.phoneNumber}
              placeholder="Type here"
              className="input input-bordered w-full"
              onChange={handleInputChange}
            />
          </div>

          <button type="submit" className="profile-save-btn  btn btn-outline btn-success">
            Save
          </button>
        </form>
      </div>
    </div>
  );
};

export default Profile;
