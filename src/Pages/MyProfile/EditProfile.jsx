import React, { useState } from "react";
import axios from "axios";
import logo from "../../assets/logo/logo-main.png";
import BASEURL from "../../../Constants";
import toast from "react-hot-toast";

const EditProfile = ({ profileData, refetch, isLoading }) => {
  const [profileImage, setProfileImage] = useState(profileData?.image || null);
  const id = localStorage.getItem("user_id");
  const [formData, setFormData] = useState({
    name: profileData?.name || "",
    address: profileData?.address || "",
    email: profileData?.email || "",
    phone: profileData?.phoneNumber || "",
    country: profileData?.country || "",
    state: profileData?.state || "",
    city: profileData?.city || "",
    postalCode: profileData?.postCode || "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleProfileImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfileImage(URL.createObjectURL(file));
      setFormData({
        ...formData,
        image: file,
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formData);
    const formDataToSend = new FormData();
    formDataToSend.append("data", JSON.stringify(formData));
    if (formData.image) {
      formDataToSend.append("image", formData.image);
    }

    try {
      const response = await axios.patch(
        `${BASEURL}/user/edit-profile/${id}`,
        formDataToSend,
        {
          headers: {
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
      refetch();
    } catch (error) {
      console.error("Error uploading data: ", error);
      // Handle error, e.g., show an error message to the user
    }
  };

  if (isLoading) {
    return <p>Loading...</p>;
  }

  return (
    <div className="bg-white p-5 m-5 grid grid-cols-5 gap-5">
      <div className="profile-image col-span-1">
        <label htmlFor="profile-image-upload" className="cursor-pointer">
          <img
            src={profileImage ? profileImage : logo}
            alt="Profile"
            className="w-full h-auto rounded-lg shadow-md"
          />
          <input
            type="file"
            id="profile-image-upload"
            accept="image/*"
            style={{ display: "none" }}
            onChange={handleProfileImageChange}
          />
        </label>
      </div>
      <div className="profile-form w-full col-span-4">
        <form className="grid grid-cols-2 gap-5" onSubmit={handleSubmit}>
          <div className="w-full">
            <label className="me-5" htmlFor="your_name">
              Name
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
            <label className="me-5" htmlFor="your_email">
              Email
            </label>
            <input
              readOnly
              type="email"
              name="email"
              value={formData.email}
              placeholder="Type here"
              className="input input-bordered w-full"
              onChange={handleInputChange}
            />
          </div>

          <div className="w-full">
            <label className="me-5" htmlFor="your_phone">
              Phone
            </label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              placeholder="Type here"
              className="input input-bordered w-full"
              onChange={handleInputChange}
            />
          </div>

          <div className="w-full">
            <label className="me-5" htmlFor="your_country">
              Country
            </label>
            <input
              type="text"
              name="country"
              value={formData.country}
              placeholder="Type here"
              className="input input-bordered w-full"
              onChange={handleInputChange}
            />
          </div>

          <div className="w-full">
            <label className="me-5" htmlFor="your_state">
              State
            </label>
            <input
              type="text"
              name="state"
              value={formData.state}
              placeholder="Type here"
              className="input input-bordered w-full"
              onChange={handleInputChange}
            />
          </div>

          <div className="w-full">
            <label className="me-5" htmlFor="your_city">
              City
            </label>
            <input
              type="text"
              name="city"
              value={formData.city}
              placeholder="Type here"
              className="input input-bordered w-full"
              onChange={handleInputChange}
            />
          </div>

          <div className="w-full">
            <label className="me-5" htmlFor="your_postal_code">
              Postal Code
            </label>
            <input
              type="text"
              name="postalCode"
              value={formData.postalCode}
              placeholder="Type here"
              className="input input-bordered w-full"
              onChange={handleInputChange}
            />
          </div>

          <div className="col-span-2 flex justify-end mt-5">
            <button
              type="submit"
              className="profile-save-btn btn btn-outline btn-success"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditProfile;
