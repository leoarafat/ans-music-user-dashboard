import axios from "axios";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { FaRegEyeSlash } from "react-icons/fa";
import { MdOutlineRemoveRedEye } from "react-icons/md";
import BASEURL from "../../../Constants";

const ChangePassword = () => {
  const [formData, setFormData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [showPassword1, setShowPassword1] = useState(false);
  const [showPassword2, setShowPassword2] = useState(false);
  const [showPassword3, setShowPassword3] = useState(false);
  const id = localStorage.getItem("user_id");
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const togglePasswordVisibility1 = () => {
    setShowPassword1(!showPassword1);
  };

  const togglePasswordVisibility2 = () => {
    setShowPassword2(!showPassword2);
  };

  const togglePasswordVisibility3 = () => {
    setShowPassword3(!showPassword3);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Send formData to API
    console.log(formData.currentPassword); // Placeholder for sending data to API
    // if(!formData?.currentPassword === formData?.currentPassword){
    //   toast.error("New password and Confirm password not match.")
    //   return;
    // }
    const data ={
      oldPassword: formData?.currentPassword,
      newPassword: formData?.newPassword
    }
    // console.log(data);
    try {
      const response = await axios.patch(`${BASEURL}/user/change-password/${id}`, data,
      {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
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
    <form className="pass-change-form" onSubmit={handleSubmit}>
      <div>
        <label className="form-control w-full">
          <div className="label">
            <span className="label-text-alt">Current Password</span>
          </div>
          <div className="relative">
            <input
            required
              type={showPassword1 ? "text" : "password"}
              placeholder="Type here"
              className="input input-bordered w-full pr-10"
              name="currentPassword"
              value={formData.currentPassword}
              onChange={handleChange}
            />
            {showPassword1 ? (
              <FaRegEyeSlash
                onClick={togglePasswordVisibility1}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 cursor-pointer"
              />
            ) : (
              <MdOutlineRemoveRedEye
                onClick={togglePasswordVisibility1}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 cursor-pointer"
              />
            )}
          </div>
        </label>
      </div>
      <div>
        <label className="form-control w-full">
          <div className="label">
            <span className="label-text-alt">New Password</span>
          </div>
          <div className="relative">
            <input
            required
              type={showPassword2 ? "text" : "password"}
              placeholder="Type here"
              className="input input-bordered w-full pr-10"
              name="newPassword"
              value={formData.newPassword}
              onChange={handleChange}
            />
            {showPassword2 ? (
              <FaRegEyeSlash
                onClick={togglePasswordVisibility2}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 cursor-pointer"
              />
            ) : (
              <MdOutlineRemoveRedEye
                onClick={togglePasswordVisibility2}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 cursor-pointer"
              />
            )}
          </div>
        </label>
      </div>
      {/* <div>
        <label className="form-control w-full">
          <div className="label">
            <span className="label-text-alt">Confirm Password</span>
          </div>
          <div className="relative">
            <input
            required
              type={showPassword3 ? "text" : "password"}
              placeholder="Type here"
              className="input input-bordered w-full pr-10"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
            />
            {showPassword3 ? (
              <FaRegEyeSlash
                onClick={togglePasswordVisibility3}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 cursor-pointer"
              />
            ) : (
              <MdOutlineRemoveRedEye
                onClick={togglePasswordVisibility3}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 cursor-pointer"
              />
            )}
          </div>
        </label>
      </div> */}
      <div className="text-end">
        <button type="submit" className="pass-change-btn">
          Submit
        </button>
      </div>
    </form>
  );
};

export default ChangePassword;
