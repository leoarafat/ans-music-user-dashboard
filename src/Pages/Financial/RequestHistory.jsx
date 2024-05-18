import React from "react";
import { FaRegEdit } from "react-icons/fa";

const RequestHistory = () => {
  return (
    <div className="bg-white p-5 m-5">
      <div>
        <div className="text-center border grid grid-cols-6 request-label">
          <h5 className="bg-[#F8FAFC] py-2">S.NO</h5>
          <h5 className="bg-[#F8FAFC] py-2">Message</h5>
          <h5 className="bg-[#F8FAFC] py-2">Amount</h5>
          <h5 className="bg-[#F8FAFC] py-2">Status</h5>
          <h5 className="bg-[#F8FAFC] py-2 ">Date</h5>
          <h5 className="bg-[#F8FAFC] py-2 ">Action</h5>
        </div>
        <div className="text-center border grid grid-cols-6">
          <p className="py-2">1</p>
          <p className="py-2">Hello</p>
          <p className="py-2">45</p>
          <p className="py-2">success</p>
          <p className="py-2">2024</p>
          <button className="py-2 flex items-center justify-center m-auto  download-btn-color">
            <FaRegEdit />
          </button>
        </div>
      </div>
    </div>
  );
};

export default RequestHistory;
