import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import BASEURL from "../../../../../Constants";

const CreateArtistBox = ({ setShowModal, refetch, isLoading }) => {
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
      refetch();
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
            Name <span className="text-red-500">*</span>
          </label>

          <input
            required
            type="text"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            placeholder="Enter Name"
            className="input input-bordered h-10 w-full"
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
            placeholder="Optional"
            className="input input-bordered h-10 w-full"
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
            placeholder="Optional"
            className="input input-bordered h-10 w-full"
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
            placeholder="Optional"
            className="input input-bordered h-10 w-full"
          />
        </div>
        <div className="w-full">
          <label className="me-5" htmlFor="your_facebook">
            Facebook URL
          </label>
          <input
            type="text"
            name="facebookUrl"
            value={formData.facebookUrl}
            onChange={handleInputChange}
            placeholder="Optional"
            className="input input-bordered h-10 w-full"
          />
        </div>

        <div className="flex items-center gap-5 mt-6">
          <button
            onClick={() => setShowModal(false)}
            type="button"
            className="inline-flex justify-center px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-100"
          >
            Close
          </button>
          <button
            onClick={handleFormSubmit}
            type="button"
            className="inline-flex justify-center ml-3 px-4 py-2 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-100"
          >
            {isLoading ? "Saving.." : "Save"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateArtistBox;
