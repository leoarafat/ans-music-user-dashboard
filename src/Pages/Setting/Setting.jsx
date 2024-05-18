import { useState } from "react";
import { IoLayersOutline } from "react-icons/io5";
import ChangePassword from "./ChangePassword";

const Setting = () => {
  const [activeTab, setActiveTab] = useState(1);
  const [showRequestHistory, setShowRequestHistory] = useState(false);

  const handleTabChange = (tabNumber) => {
    setActiveTab(tabNumber);
    setShowRequestHistory(false); // Hide RequestHistory when changing tabs
  };

  return (
    <div className="bg-[#F8FAFC] shadow-md rounded-md pb-5">
      {/* Top side manu  */}
      <div className="my-2 bg-white px-5 pt-5 rounded-t-md">
        <h3 className="text-2xl uppercase font-bold">SETTING</h3>
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
            <span>Password Change</span>
          </button>
        </div>
      </div>
      <div className="m-5 p-5 bg-white">
        {activeTab === 1 && !showRequestHistory && (
          <ChangePassword></ChangePassword>
        )}
      </div>
    </div>
  );
};

export default Setting;
