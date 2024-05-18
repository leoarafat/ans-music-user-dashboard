import { useEffect, useState } from "react";
import ProfileVerification from "./ProfileVerification/ProfileVerification";
import LebelVerification from "./LabelVerification/LebelVerification";
import AgreementSignin from "./AgreementSignin/AgreementSignin";
import { FaRegCircleUser } from "react-icons/fa6";
import { BsFillBookmarkCheckFill } from "react-icons/bs";
import { IoDocumentTextOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import { FaRegCircleCheck } from "react-icons/fa6";

const VarificationPage = () => {
  const localStorageActiveTab = parseInt(localStorage.getItem("activeTab"));
  const [activeTab, setActiveTab] = useState(localStorageActiveTab || 1);
  // Checking
  const storedProfileDataString = localStorage.getItem("profileData");
  const storedLabelDataDataString = localStorage.getItem("labelData");
  const storedProfileData = JSON.parse(storedProfileDataString);
  const storedLabelData = JSON.parse(storedLabelDataDataString);
  const verifiedString = localStorage.getItem("isVerified");
  const isVerified = JSON.parse(verifiedString);
  // console.log(isVerified);

  const navigate = useNavigate();

  const handleTabChange = (tabNumber) => {
    setActiveTab(tabNumber);
  };

  useEffect(() => {
    if (isVerified) {
      navigate("/");
    }
  }, [isVerified]);
  useEffect(() => {
    localStorage.setItem("activeTab", activeTab);
  }, [activeTab]);
  return (
    <div className="p-2">
      <div className="top_s flex items-end gap-4 mt-2">
        <h3 className="text-2xl uppercase font-bold">verifications</h3>
        <h5 className="font-bold text-md">
          <span className="font-semibold text-gray-500">
            STEP {activeTab} :
          </span>{" "}
          {(activeTab === 1 && "PROFILE") ||
            (activeTab === 2 && "LABEL") ||
            (activeTab === 3 && "AGREEMENT")}
        </h5>
      </div>
      {/* contant div  */}
      <div className="">
        {/* Top side manu  */}
        <div className="my-2">
          <div className="grid grid-cols-3  bg-white rounded-full">
            <button
              className={`w-full py-2 flex items-center  rounded-l-full justify-between text-gray-500 ${
                activeTab === 1 ? " text-white verify_step_bg font-bold" : ""
              }`}
              onClick={() => handleTabChange(1)}
            >
              <div className="flex items-center w-full">
                <div className="icon flex items-center justify-center w-1/4">
                  {storedProfileData ? (
                    <span className="text-3xl text-green-600 font-semibold">
                      <FaRegCircleCheck />
                    </span>
                  ) : (
                    <span className="text-3xl">
                      <FaRegCircleUser />
                    </span>
                  )}
                </div>
                <div className="flex flex-col justify-center w-3/4">
                  <span className="text-[#94A3B8] text-sm">Pending</span>
                  <p
                    className={` font-semibold ${
                      activeTab === 1
                        ? " text-white font-bold"
                        : "text-[#0F172A]"
                    }`}
                  >
                    Profile Verification
                  </p>
                </div>
              </div>
            </button>
            <button
              className={`w-full py-2 flex items-center justify-between text-gray-500 ${
                activeTab === 2 ? " text-white verify_step_bg font-bold" : ""
              }`}
              onClick={() => handleTabChange(2)}
            >
              <div className="flex items-center w-full">
                <div className="icon flex items-center justify-center w-1/4">
                  {storedLabelData ? (
                    <span className="text-3xl text-green-600 font-semibold">
                      <FaRegCircleCheck />
                    </span>
                  ) : (
                    <span className="text-3xl">
                      <BsFillBookmarkCheckFill />
                    </span>
                  )}
                </div>
                <div className="flex flex-col justify-center w-3/4">
                  <span className="text-[#94A3B8] text-sm">Pending</span>
                  <p
                    className={` font-semibold ${
                      activeTab === 2
                        ? " text-white font-bold"
                        : "text-[#0F172A]"
                    }`}
                  >
                    Label Verrification
                  </p>
                </div>
              </div>
            </button>
            <button
              className={`w-full py-2 flex items-center  rounded-r-full justify-between text-gray-500 ${
                activeTab === 3 ? " text-white verify_step_bg font-bold" : ""
              }`}
              onClick={() => handleTabChange(3)}
            >
              <div className="flex items-center w-full">
                <div className="icon flex items-center justify-center w-1/4">
                  <span className="text-3xl">
                    <IoDocumentTextOutline />
                  </span>
                </div>
                <div className="flex flex-col justify-center w-3/4">
                  <span className="text-[#94A3B8] text-sm">Pending</span>
                  <p
                    className={` font-semibold ${
                      activeTab === 3
                        ? " text-white font-bold"
                        : "text-[#0F172A]"
                    }`}
                  >
                    Agreement
                  </p>
                </div>
              </div>
            </button>
          </div>
        </div>
        {/* left containt  */}
        <div className="col-span-4">
          <div className="">
            {activeTab === 1 && (
              <ProfileVerification
                handleTabChange={handleTabChange}
              ></ProfileVerification>
            )}
            {activeTab === 2 && (
              <LebelVerification
                handleTabChange={handleTabChange}
              ></LebelVerification>
            )}
            {activeTab === 3 && (
              <AgreementSignin
                handleTabChange={handleTabChange}
              ></AgreementSignin>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default VarificationPage;
