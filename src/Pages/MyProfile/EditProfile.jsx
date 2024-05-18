import React, { useState } from "react";
import axios from "axios";
import logo from "../../assets/logo/logo-main.png";

const EditProfile = ({profileData}) => {
  const [profileImage, setProfileImage] = useState(null);
  const [govtIdImage, setGovtIdImage] = useState(null);
  const [formData, setFormData] = useState({
    name: profileData?.name,
    address: profileData?.address,
    email: profileData?.email,
    phone: profileData?.phoneNumber,
    country: profileData?.country,
    state: profileData?.state,
    city: profileData?.city,
    postalCode: profileData?.postCode,
    govtId: "",
  });
console.log(profileData);
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleProfileImageChange = (e) => {
    const file = e.target.files[0];
    setProfileImage(file);
  };

  const handleGovtIdImageChange = (e) => {
    const file = e.target.files[0];
    setGovtIdImage(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData();
    data.append("profileImage", profileImage);
    data.append("govtIdImage", govtIdImage);

    for (let key in formData) {
      data.append(key, formData[key]);
    }

    try {
      const response = await axios.post("YOUR_API_ENDPOINT", data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      console.log(response.data);
      // Handle success, e.g., show a success message to the user
    } catch (error) {
      console.error("Error uploading data: ", error);
      // Handle error, e.g., show an error message to the user
    }
  };

  return (
    <div className="bg-white p-5 m-5 grid grid-cols-5 gap-5">
      <div className="profile-image col-span-1">
        <label htmlFor="profile-image-upload" className="cursor-pointer">
          <img
            src={profileImage ? URL.createObjectURL(profileImage) : logo}
            alt="Profile"
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
          {/* <div className="w-full mt-5">
            <label
              htmlFor="govt-id-upload"
              className="cursor-pointer gov-id-upload"
            >
              Govt. ID Upload
              <input
                type="file"
                id="govt-id-upload"
                accept="image/*"
                style={{ display: "none" }}
                onChange={handleGovtIdImageChange}
              />
            </label>
            {govtIdImage && (
              <img
                src={URL.createObjectURL(govtIdImage)}
                alt="Govt. ID"
                className="mt-2"
              />
            )}
          </div> */}

          <button type="submit" className="profile-save-btn btn btn-outline btn-success">
            Save
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditProfile;
