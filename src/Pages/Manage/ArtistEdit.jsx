import React, { useState } from "react";
import axios from "axios";
import BASEURL from "../../../Constants";
import toast from "react-hot-toast";

const ArtistEdit = ({item, refetch, setEditItemId}) => {
  console.log(item);
  const [formData, setFormData] = useState({
    name: item?.primaryArtistName,
    instagramId: item?.primaryArtistYoutubeId,
    spotifyId: item?.primaryArtistSpotifyId,
    appleId: item?.primaryArtistAppleId,
    facebookUrl: item?.primaryArtistFacebookId,
    profileImage: null, // Initialize profileImage as null
  });
  // const id = localStorage.getItem("user_id");
  const handleFormSubmit = async (event) => {
    event.preventDefault();
    const formDataToSend = new FormData();
    formDataToSend.append("name", formData.name);
    formDataToSend.append("instagramId", formData.instagramId);
    formDataToSend.append("spotifyId", formData.spotifyId);
    formDataToSend.append("appleId", formData.appleId);
    formDataToSend.append("facebookUrl", formData.facebookUrl);
    formDataToSend.append("profileImage", formData.profileImage);
    const data = {
      user: localStorage.getItem("user_id"),
      primaryArtistName: formData.name,
      // primaryArtistId,
      primaryArtistSpotifyId: formData.spotifyId,
      primaryArtistAppleId: formData.appleId,
      primaryArtistFacebookId: formData.facebookUrl,
      primaryArtistYoutubeId: formData.instagramId,
    };
    try {
      const response = await axios.patch(
        `${BASEURL}/manage/edit-artist/${item?._id}`,
        data,
        {
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        }
      );
      console.log(response.data);
      toast.success(`${response.data.message}`);
      setEditItemId(null)
      refetch()
      return response.data;
    } catch (error) {
      console.log(error.response.data);
      toast.error(`${error.response.data.message}`);
      throw new Error(error.response.data.message);
    }
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

 

  console.log(formData);
  return (
    <div className="">
      <form
        className="grid grid-cols-2 gap-5 bg-white p-4"
        onSubmit={handleFormSubmit}
      >
        <div className="w-full">
          <label className="me-5" htmlFor="your_name">
            Name
          </label>
          <input
            required
            type="text"
            name="name"
            placeholder="Type here"
            className="input input-bordered w-full"
            value={formData.name}
            onChange={handleInputChange}
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
            placeholder="Type here"
            className="input input-bordered w-full"
            value={formData.instagramId}
            onChange={handleInputChange}
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
            placeholder="Type here"
            className="input input-bordered w-full"
            value={formData.spotifyId}
            onChange={handleInputChange}
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
            placeholder="Type here"
            className="input input-bordered w-full"
            value={formData.appleId}
            onChange={handleInputChange}
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
            placeholder="Type here"
            className="input input-bordered w-full"
            value={formData.facebookUrl}
            onChange={handleInputChange}
          />
        </div>

        <button
          type="submit"
          className="profile-save-btn  btn btn-outline btn-success"
        >
          Save
        </button>
      </form>
    </div>
  );
};

export default ArtistEdit;
