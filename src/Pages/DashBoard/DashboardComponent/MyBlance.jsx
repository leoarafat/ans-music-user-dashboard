import React from "react";
import { FaBangladeshiTakaSign } from "react-icons/fa6";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import BASEURL from "../../../../Constants";

const MyBlance = () => {
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
          setAuthenticated(error?.response?.data?.message);
          console.log("Respons:", error?.response?.data?.message);
          throw error;
        }
      },
    });
  return (
    <div className="bg-white p-5 my-5 rounded">
      <div className="box-1">
        <div className="box-2">
          <div className="box-3">
            <div className="flex items-center justify-center h-[150px]  font-bold">
              <span>
                <FaBangladeshiTakaSign />
              </span>{" "}
              {profileData?.data?.balance}
            </div>
          </div>
        </div>
      </div>

      <div className="text-center my-blance">
        <button className="uppercase my-blance-btn">My Blance</button>
      </div>
    </div>
  );
};

export default MyBlance;
