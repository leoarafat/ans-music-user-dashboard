import React from "react";
import { FiDownload } from "react-icons/fi";

const LastSixMonth = () => {
  return (
    <div className="bg-white p-5 m-5">
      <h5 className="six-month mb-2">Last Six Month Earning</h5>
      <div>
        <div className="text-center border grid grid-cols-5 six-mon-label">
          <h5 className="bg-[#F8FAFC] py-2">S.NO</h5>
          <h5 className="bg-[#F8FAFC] py-2">Month</h5>
          <h5 className="bg-[#F8FAFC] py-2">Year</h5>
          <h5 className="bg-[#F8FAFC] py-2">Total Amount</h5>
          <h5 className="bg-[#F8FAFC] py-2 ">Action</h5>
        </div>
        <div className="text-center border grid grid-cols-5">
          <p className="py-2">1</p>
          <p className="py-2">January</p>
          <p className="py-2">2024</p>
          <p className="py-2">0.06</p>
          <button className="py-2 flex items-center justify-center m-auto  download-btn-color">
            <FiDownload className="me-2" /> Download
          </button>
        </div>
        <div className="text-center border grid grid-cols-5">
          <p className="py-2">1</p>
          <p className="py-2">January</p>
          <p className="py-2">2024</p>
          <p className="py-2">0.06</p>
          <button className="py-2 flex items-center justify-center m-auto  download-btn-color">
            <FiDownload className="me-2" /> Download
          </button>
        </div>
        <div className="text-center border grid grid-cols-5">
          <p className="py-2">1</p>
          <p className="py-2">January</p>
          <p className="py-2">2024</p>
          <p className="py-2">0.06</p>
          <button className="py-2 flex items-center justify-center m-auto download-btn-color">
            <FiDownload className="me-2" /> Download
          </button>
        </div>
      </div>
    </div>
  );
};

export default LastSixMonth;
