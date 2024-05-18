import { useState } from "react";
import { FaRegCircleUser } from "react-icons/fa6";
import { IoLayersOutline } from "react-icons/io5";
import { IoMusicalNotesOutline } from "react-icons/io5";
import LabelManage from "./LabelManage";
import PrimaryArtist from "./PrimaryArtist";
import AddArtist from "./AddArtist";

const Manage = () => {
  const [activeTab, setActiveTab] = useState(1);

  const handleTabChange = (tabNumber) => {
    setActiveTab(tabNumber);
  };
  return (
    <div className="bg-[#F8FAFC] shadow-md rounded-md">
      {/* Top side manu  */}
      <div className="my-2 bg-white px-5 pt-5 rounded-t-md">
        <h3 className="text-2xl uppercase font-bold">Manage</h3>
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
            <span>Label Manage</span>
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
            <span>Primary Artist Manage</span>
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
            
            <span>Add Primary Artist</span>
          </button>
        </div>
      </div>
      <div className="p-5 pt-2">
        {activeTab === 1 && <LabelManage></LabelManage>}
        {activeTab === 2 && <PrimaryArtist></PrimaryArtist>}
        {activeTab === 3 && <AddArtist></AddArtist>}
      </div>
    </div>
  );
};

export default Manage;
