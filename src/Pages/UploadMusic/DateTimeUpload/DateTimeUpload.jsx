import React, { useContext, useState } from "react";
import DatePicker from "react-datepicker";
import { FaRegCalendarCheck } from "react-icons/fa6";
import "react-datepicker/dist/react-datepicker.css";
import { MdOutlineSkipNext } from "react-icons/md";
import { RiSkipBackMiniLine } from "react-icons/ri";
import { AuthContext } from "../../../context/AuthProvider";
const DateTimeUpload = ({ handleTabChange }) => {
  // const [startDate, setStartDate] = useState(new Date());
  const { startDate, setStartDate } = useContext(AuthContext);
  const handleSaveDate = () => {
    console.log(startDate);
    localStorage.setItem("releaseDate", startDate);
    handleTabChange(4);
  };
  return (
    <div className="bg-white rounded-md p-4">
      <h4 className="font-semibold text-xl capitalize my-3">
        Chose release date
      </h4>
      <span className="text-sm text-gray-400">
        An asterisk (*) indicates required fields.
      </span>
      <br></br>
      <span className="text-sm text-gray-400">
        As much information as you can should be included into the fields. This
        will enable you to market the combo more successfully.
      </span>
      <div className="my-5">
        <div className="form-control ">
          <label className="label">
            <span className=" font-semibold">Release dates</span>
          </label>
          <div className="relase_date font-semibold text-lg pl-9 text-gray-500 relative">
            <span className="absolute left-2 top-1 text-xl">
              <FaRegCalendarCheck />
            </span>
            <DatePicker
              selected={startDate}
              onChange={(date) => setStartDate(date)}
            />
          </div>
        </div>
        <div className="form-control my-2">
          <label className="cursor-pointer label justify-start gap-2">
            <input
              type="checkbox"
              className="checkbox  checkbox-sm checkbox-success"
            />
            <span className="label-text">
              I agree to the Terms and Conditions.
            </span>
          </label>
        </div>
        <div className="button_box flex items-center justify-between p-2 mt-8">
          <button
            onClick={() => handleTabChange(2)}
            type="button"
            className="btn btn-sm btn-outline btn-success flex items-center gap-1"
          >
            {" "}
            <span className="text-xl">
              <RiSkipBackMiniLine />{" "}
            </span>
            Back
          </button>
          <button
            onClick={handleSaveDate}
            type="button"
            className="btn btn-sm btn-outline btn-success flex items-center gap-1"
          >
            Next{" "}
            <span className="text-xl">
              <MdOutlineSkipNext />
            </span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default DateTimeUpload;
