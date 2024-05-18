import React, { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import BASEURL from "../../../../../Constants";

const CreateArtistBox = ({ setShowModal, refetch }) => {
  const [formData, setFormData] = useState({
    name: "",
    instagramId: "",
    spotifyId: "",
    appleId: "",
    facebookUrl: "",
  });
  const id = localStorage.getItem("user_id");

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleFormSubmit = async () => {
    const data = {
      user: id,
      primaryArtistName: formData.name,
      primaryArtistSpotifyId: formData.spotifyId,
      primaryArtistAppleId: formData.appleId,
      primaryArtistFacebookId: formData.facebookUrl,
      primaryArtistYoutubeId: formData.instagramId,
    };
// console.log(data);
    try {
      const response = await axios.post(`${BASEURL}/manage/add-artist`, data, {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      });
      console.log(response.data);
      toast.success(`${response.data.message}`);
      refetch()
      setShowModal(false);
      return response.data;
    } catch (error) {
      console.log(error.response.data);
      toast.error(`${error.response.data.message}`);
      throw new Error(error.response.data.message);
    }
  };

  return (
    <div className="w-full my-4 shadow-md">
      <div className="grid grid-cols-2 gap-5 bg-green-50 p-4">
        <div className="w-full">
          <label className="me-5" htmlFor="your_name">
            Name
          </label>
          <input
            required
            type="text"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            placeholder="Type here"
            className="input input-bordered w-full"
          />
        </div>
        <div className="w-full">
          <label className="me-5" htmlFor="your_instagram">
            Instagram ID
          </label>
          <input
            required
            type="text"
            name="instagramId"
            value={formData.instagramId}
            onChange={handleInputChange}
            placeholder="Type here"
            className="input input-bordered w-full"
          />
        </div>
        <div className="w-full">
          <label className="me-5" htmlFor="your_spotify">
            Spotify ID
          </label>
          <input
            required
            type="text"
            name="spotifyId"
            value={formData.spotifyId}
            onChange={handleInputChange}
            placeholder="Type here"
            className="input input-bordered w-full"
          />
        </div>
        <div className="w-full">
          <label className="me-5" htmlFor="your_apple">
            Apple ID
          </label>
          <input
            required
            type="text"
            name="appleId"
            value={formData.appleId}
            onChange={handleInputChange}
            placeholder="Type here"
            className="input input-bordered w-full"
          />
        </div>
        <div className="w-full">
          <label className="me-5" htmlFor="your_facebook">
            Facebook URL
          </label>
          <input
            required
            type="text"
            name="facebookUrl"
            value={formData.facebookUrl}
            onChange={handleInputChange}
            placeholder="Type here"
            className="input input-bordered w-full"
          />
        </div>

        <div className="flex items-center gap-5">
          <button
            onClick={() => setShowModal(false)}
            type="button"
            className="profile-save-btn  btn  btn-outline btn-success"
          >
            Close
          </button>
          <button
            onClick={handleFormSubmit}
            type="button"
            className="profile-save-btn  btn btn-outline btn-success"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateArtistBox;
