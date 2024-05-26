import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import BASEURL from "../../../../../Constants";

const CreateLabelBox = ({ setShowLabelModal, refetch, isLoading }) => {
  const [formData, setFormData] = useState({
    labelName: "",
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
      labelName: formData.labelName,
    };
    // console.log(data);
    try {
      const response = await axios.post(`${BASEURL}/manage/add-label`, data, {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      });

      toast.success(`${response.data.message}`);
      refetch();
      setShowLabelModal(false);
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
          <label className="font-semibold " htmlFor="labelName">
            Label Name
          </label>
          <input
            required
            type="text"
            name="labelName"
            value={formData.labelName}
            onChange={handleInputChange}
            placeholder="Type here"
            className="input input-bordered w-full h-10 mt-3"
          />
        </div>

        <div className="flex items-end justify-end">
          <button
            onClick={() => setShowLabelModal(false)}
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

export default CreateLabelBox;
