import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import BASEURL from "../../../Constants";
import logo from "../../assets/logo/logo-main.png";

const Profile = ({ profileData, refetch, isLoading }) => {
  const [formData, setFormData] = useState({
    name: profileData?.name || "",
    address: profileData?.address || "",
    phoneNumber: profileData?.phoneNumber || "",
    image: profileData?.image || "",
  });

  const [profileImage, setProfileImage] = useState(profileData?.image || null);
  const id = localStorage.getItem("user_id");

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData({
        ...formData,
        image: file,
      });
      setProfileImage(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formDataToSend = new FormData();

    const data = {
      name: formData?.name,
      phoneNumber: formData?.phoneNumber,
      address: formData?.address,
    };
    formDataToSend.append("data", JSON.stringify(data));
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

      console.error(error.response.data);
      throw new Error(error.response.data.message);
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
          <div className="col-span-2 flex justify-end">
            <button type="submit" className="btn btn-outline btn-success">
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Profile;
