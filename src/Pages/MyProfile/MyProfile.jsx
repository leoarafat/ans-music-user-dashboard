import { useState } from "react";
import { FaRegCircleUser } from "react-icons/fa6";
import { IoLayersOutline } from "react-icons/io5";
import { IoMusicalNotesOutline } from "react-icons/io5";
import Profile from "./Profile";
import AboutProfile from "./AboutProfile";
import EditProfile from "./EditProfile";

import BASEURL from "../../../Constants";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";

const MyProfile = () => {
  const [activeTab, setActiveTab] = useState(1);
  const id = localStorage.getItem("user_id");

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
        // setAuthenticated(error?.response?.data?.message);
        console.log("Respons:", error?.response?.data?.message);
        throw error;
      }
    },
  });
  // console.log(profileData)
  const handleTabChange = (tabNumber) => {
    setActiveTab(tabNumber);
  };
  return (
    <div className="bg-[#F8FAFC] shadow-md rounded-md">
      {/* Top side manu  */}
      <div className="my-2 bg-white px-5 pt-5 rounded-t-md">
        <h3 className="text-2xl uppercase font-bold">My Profile</h3>
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
            <span>Profile View</span>
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
            <span>About Profile</span>
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
              <IoMusicalNotesOutline />
            </span>
            <span>Edit Profile</span>
          </button>
          {/* <button
            className={`px-8 py-4 text-sm flex items-center justify-center gap-2  ${
              activeTab === 4
                ? " text-[#199332] tab_step_bg font-bold"
                : "text-gray-500 font-semibold"
            }`}
            onClick={() => handleTabChange(4)}
          >
            <span className="text-xl">
              <IoMusicalNotesOutline />
            </span>
            <span>Edit Details</span>
          </button> */}
        </div>
      </div>
      <div className="">
        {activeTab === 1 && <Profile profileData={profileData?.data}></Profile>}
        {activeTab === 2 && (
          <AboutProfile profileData={profileData?.data}></AboutProfile>
        )}
        {activeTab === 3 && (
          <EditProfile profileData={profileData?.data}></EditProfile>
        )}
        {/* {activeTab === 4 && <EditDetails profileData={profileData?.data}></EditDetails>} */}
      </div>
    </div>
  );
};

export default MyProfile;
