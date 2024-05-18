import axios from "axios";
import React from "react";
import BASEURL from "../../../../Constants";
import toast from "react-hot-toast";

const WhiteListRequest = ({ handleTabChange }) => {
  const handleWhiteListRequest = async (e) => {
    e.preventDefault();
    const url = e.target.url.value;
    const data = {
      url,
      user: localStorage.getItem("user_id"),
    };
    // console.log(url);
    try {
      const response = await axios.post(`${BASEURL}/user/add-whitelist`, data, {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      });
      console.log(response.data);
      toast.success(`${response.data.message}`);

      return response.data;
    } catch (error) {
      console.log(error.response.data);
      toast.error(`${error.response.data.message}`);
      throw new Error(error.response.data.message);
    }
  };
  return (
    <div className="p-5">
      <form
        onSubmit={handleWhiteListRequest}
        className="input_div bg-white py-20 grid grid-cols-2 gap-4 rounded gap-x-6 p-5"
      >
        <label className="form-control w-full">
          <span className="text-sm font-semibold mb-2">
            URL <span className="text-red-500">*</span>
          </span>
          <input
            type="url"
            name="url"
            placeholder="Enter URL"
            className="input  w-full bg-[#F7FEF8]"
          />
        </label>
        <div className="button flex items-end ">
          <input
            type="submit"
            value={"submit"}
            className="btn px-8 btn-success text-white uppercase bg-green-600"
          />
        </div>
      </form>
    </div>
  );
};

export default WhiteListRequest;
