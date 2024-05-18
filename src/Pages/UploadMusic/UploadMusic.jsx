import { useState } from "react";
import FilesUpload from "./FilesUpload/FilesUpload";
import InputUpload from "./InputUpload/InputUpload";
import DateTimeUpload from "./DateTimeUpload/DateTimeUpload";
import DataChecking from "./DataChecking/DataChecking";

const UploadMusic = () => {
  const [activeTab, setActiveTab] = useState(1);

  const handleTabChange = (tabNumber) => {
    setActiveTab(tabNumber);
  };
  return (
    <div className="p-2">
      <div className="top_s flex items-end gap-6 py-3 border-b-4 ">
        <h3 className="text-2xl uppercase font-bold">Uploading</h3>
        <h5 className="font-bold text-md">
          <span className="font-semibold text-gray-500">STEP {activeTab} :</span> {activeTab === 1 && "FILES" || activeTab === 2 && "DATA INPUT"  || activeTab === 3 && "RELEASE DATE & TIME"  || activeTab === 4 && "DATA CHECKING"}
        </h5>
      </div>
      {/* contant div  */}
      <div className="grid grid-cols-6 gap-3 md:gap-6 mt-3">
        {/* left containt  */}
        <div className="col-span-4">
          <div className="">
            {activeTab === 1 && <FilesUpload handleTabChange={handleTabChange}></FilesUpload>}
            {activeTab === 2 && <InputUpload setActiveTab={setActiveTab}></InputUpload>}
            {activeTab === 3 && <DateTimeUpload handleTabChange={handleTabChange}></DateTimeUpload>}
            {activeTab === 4 && <DataChecking handleTabChange={handleTabChange}></DataChecking>}
          </div>
        </div>
        {/* right side manu  */}
        <div className="col-span-2">
          <div className="flex flex-col gap-5 ">
            <button
              className={`w-full flex items-center justify-between text-gray-500 ${
                activeTab === 1 ? " text-black font-bold" : ""
              }`}
              onClick={() => handleTabChange(1)}
            >
              <div className="flex items-center gap-3">
                <p className="w-5 h-5 rounded-full shadow-md bg-white flex items-center justify-center ">
                  <span
                    className={`w-3 h-3 rounded-full   ${
                      activeTab === 1 ? "block bg-black" : ""
                    }`}
                  ></span>
                </p>
                <p className="flex items-start flex-col ">
                  <span className="text-sm ">Step-1</span>
                  <span className="font-semibold text-sm">FILES</span>
                </p>
              </div>
              <p className="text-sm text-black">25%</p>
            </button>
            <button
              className={`w-full flex items-center justify-between text-gray-500 ${
                activeTab === 2 ? " text-black font-bold" : ""
              }`}
              onClick={() => handleTabChange(2)}
            >
              <div className="flex items-center gap-3">
                <p className="w-5 h-5 rounded-full shadow-md bg-white flex items-center justify-center ">
                  <span
                    className={`w-3 h-3 rounded-full   ${
                      activeTab === 2 ? "block bg-black" : ""
                    }`}
                  ></span>
                </p>
                <p className="flex items-start flex-col ">
                  <span className="text-sm ">Step-2</span>
                  <span className="font-semibold text-sm">DATA INPUT</span>
                </p>
              </div>
              <p className="text-sm text-black">25%</p>
            </button>
            <button
              className={`w-full flex items-center justify-between text-gray-500 ${
                activeTab === 3 ? " text-black font-bold" : ""
              }`}
              onClick={() => handleTabChange(3)}
            >
              <div className="flex items-center gap-3">
                <p className="w-5 h-5 rounded-full shadow-md bg-white flex items-center justify-center ">
                  <span
                    className={`w-3 h-3 rounded-full   ${
                      activeTab === 3 ? "block bg-black" : ""
                    }`}
                  ></span>
                </p>
                <p className="flex items-start flex-col ">
                  <span className="text-sm ">Step-3</span>
                  <span className="font-semibold text-sm">RELEASE DATE & TIME</span>
                </p>
              </div>
              <p className="text-sm text-black">25%</p>
            </button>
            <button
              className={`w-full flex items-center justify-between text-gray-500 ${
                activeTab === 4 ? " text-black font-bold" : ""
              }`}
              onClick={() => handleTabChange(4)}
            >
              <div className="flex items-center gap-3">
                <p className="w-5 h-5 rounded-full shadow-md bg-white flex items-center justify-center ">
                  <span
                    className={`w-3 h-3 rounded-full   ${
                      activeTab === 4 ? "block bg-black" : ""
                    }`}
                  ></span>
                </p>
                <p className="flex items-start flex-col ">
                  <span className="text-sm ">Step-4</span>
                  <span className="font-semibold text-sm">DATA CHECKING</span>
                </p>
              </div>
              <p className="text-sm text-black">25%</p>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UploadMusic;
