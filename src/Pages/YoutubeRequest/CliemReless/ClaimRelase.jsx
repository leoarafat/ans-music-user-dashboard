import React from "react";
import img from "../../../assets/youtube-request/Frame.png";
import axios from "axios";
import BASEURL from "../../../../Constants";
import toast from "react-hot-toast";
const ClaimRelease = ({ handleTabChange }) => {
  const handleClaimRelease = async (e) => {
    e.preventDefault();
    const url = e.target.url.value;
    const data = {
      url,
      user: localStorage.getItem("user_id"),
    };
    // console.log(url);
    try { 
      const response = await axios.post(`${BASEURL}/user/add-claims`, data, {
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
    // handleTabChange(2)
  };
  return (
    <div className="p-5">
      <div className="grid grid-cols-2">
        <div className="flex items-center justify-center flex-col gap-3">
          <h4 className="text-black font-semibold text-xl">Hello, Arafat!</h4>
          <p>Enter the URL to make a YouTube request</p>
        </div>
        <div className="flex items-center justify-center gap-3">
          <div className="img w-1/2">
            <img className="w-full" src={img} alt="img" />
          </div>
        </div>
      </div>
      <form
        onSubmit={handleClaimRelease}
        className="input_div bg-white pt-8 pb-20 grid grid-cols-2 gap-4 rounded gap-x-6 p-5"
      >
        <label className="form-control w-full">
          <span className="text-sm font-semibold mb-2">
            URL <span className="text-red-500">*</span>
          </span>
          <input
            name="url"
            type="url"
            placeholder="Enter URL"
            className="input  w-full bg-[#F7FEF8]"
          />
        </label>
        <div className="button flex gap-3 items-end ">
          <input
            type="submit"
            value={"submit"}
            className="btn px-8 btn-success text-white uppercase bg-green-600"
          />
          {/* <button
            type="button"
            className="btn px-4 text-white uppercase bg-black"
          >
            Add Author
          </button> */}
        </div>
      </form>
    </div>
  );
};

export default ClaimRelease;
