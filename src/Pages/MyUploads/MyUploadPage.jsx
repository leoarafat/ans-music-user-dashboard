import { useState } from "react";
import { FaRegCircleUser } from "react-icons/fa6";
import { IoLayersOutline } from "react-icons/io5";
import { IoMusicalNotesOutline } from "react-icons/io5";
import Successfull from "./Successfull/Successfull";
import Finalize from "./Finalize/Finalize";
import Corrections from "./Courrection/Courrection";

const MyUploadPage = () => {
  const [activeTab, setActiveTab] = useState(1);

  const handleTabChange = (tabNumber) => {
    setActiveTab(tabNumber);
  };
  return (
    <div className="bg-[#F8FAFC] shadow-md rounded-md">
      {/* Top side manu  */}
      <div className="my-2 bg-white px-5 pt-5 rounded-t-md">
        <h3 className="text-2xl uppercase font-bold">My Upload</h3>
        <div className=" flex items-center pt-2">
          <button
            className={`px-8 py-4 text-sm flex items-center justify-center gap-2  ${
              activeTab === 1
                ? " text-[#199332] tab_step_bg font-bold"
                : "text-gray-500 font-semibold"
            }`}
            onClick={() => handleTabChange(1)}
          >
            <span className="text-xl">
              <IoLayersOutline />
            </span>
            <span>Successful Release (100)</span>
          </button>
          <button
            className={`px-8 py-4 text-sm flex items-center justify-center gap-2  ${
              activeTab === 2
                ? " text-[#199332] tab_step_bg font-bold"
                : "text-gray-500 font-semibold"
            }`}
            onClick={() => handleTabChange(2)}
          >
            <span className="text-xl">
              <FaRegCircleUser />
            </span>
            <span>Release to finalize music</span>
          </button>
          <button
            className={`px-8 py-4 text-sm flex items-center justify-center gap-2  ${
              activeTab === 3
                ? " text-[#199332] tab_step_bg font-bold"
                : "text-gray-500 font-semibold"
            }`}
            onClick={() => handleTabChange(3)}
          >
            <span className="text-xl">
              <FaRegCircleUser />
            </span>
            <span>Release Correction</span>
          </button>
        </div>
      </div>
      <div className="m-p">
        {activeTab === 1 && <Successfull></Successfull>}
        {activeTab === 2 && <Finalize></Finalize>}
        {activeTab === 3 && <Corrections></Corrections>}
      </div>
    </div>
  );
};

export default MyUploadPage;
