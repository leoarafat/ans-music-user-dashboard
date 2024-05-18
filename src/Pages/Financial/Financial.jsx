import { useState } from "react";
import { IoLayersOutline } from "react-icons/io5";
import AmountRequest from "./AmountRequest";
import LastSixMonth from "./LastSixMonth";
import RequestHistory from "./RequestHistory";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import Loader from "../Shared/Loader/Loader";

const Financial = () => {
  const [activeTab, setActiveTab] = useState(1);
  const [showRequestHistory, setShowRequestHistory] = useState(false);

  const handleTabChange = (tabNumber) => {
    setActiveTab(tabNumber);
    setShowRequestHistory(false); // Hide RequestHistory when changing tabs
  };

  const handleViewRequestHistory = () => {
    setShowRequestHistory(true);
  };
   // <<<<<<<<< Profile info Data Recived >>>>>>>>>>
   const { data: profileData = [], isLoading } = useQuery({
    queryKey: ["profileData"],
    queryFn: async () => {
      try {
        const response = await axios.get(`${BASEURL}/user/profile/${id}`, {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: localStorage.getItem("token"),
          },
        });
        return response.data;
      } catch (error) {
        setAuthenticated(error?.response?.data?.message);
        console.log("Respons:", error?.response?.data?.message);
        throw error;
      }
    },
  });
    // console.log(profileData.data.balance)
    if(isLoading){
      return <Loader></Loader>
    }
  return (
    <div className="bg-[#F8FAFC] shadow-md rounded-md">
      {/* Top side manu  */}
      <div className="my-2 bg-white px-5 pt-5 rounded-t-md">
        <h3 className="text-2xl uppercase font-bold">Financial</h3>
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
            <span>Payment</span>
          </button>
        </div>
      </div>
      <div className="p-5">
        {/* <div className="flex justify-end me-5">
          <button className="request-buton" onClick={handleViewRequestHistory}>
            VIEW REQUEST HISTORY
          </button>
        </div>
        {activeTab === 1 && !showRequestHistory && (
          <>
            <AmountRequest />
            <LastSixMonth />
          </>
        )}
        {showRequestHistory && <RequestHistory />} */}
         <div className="text-center w-1/2 mx-auto shadow-md rounded-md">
          <h5 className="bg-[#E8F9E0] py-2">Available Amount</h5>
          <p className="py-7">BDT {profileData?.data?.balance}</p>
        </div>
      </div>
    </div>
  );
};

export default Financial;
