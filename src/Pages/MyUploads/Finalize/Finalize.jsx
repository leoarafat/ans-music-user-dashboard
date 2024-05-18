import React from "react";
import {
  FaRegLightbulb,
  FaMusic,
  FaUser,
  FaEye,
  FaRegEdit,
} from "react-icons/fa";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import BASEURL from "../../../../Constants";
import SongCard from "../SongCard/SongCard";
import { CirclesWithBar } from "react-loader-spinner";

const Finalize = () => {
  const id = localStorage.getItem("user_id");

  // <<<<<<<<< Profile info Data Recived >>>>>>>>>>
  const { data: finalizeSongs = [], isLoading } = useQuery({
    queryKey: ["finalizeSongs"],
    queryFn: async () => {
      try {
        const response = await axios.get(
          `${BASEURL}/user/pending-release/${id}`,
          {
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
              Authorization: localStorage.getItem("token"),
            },
          }
        );
        return response.data;
      } catch (error) {
        // setAuthenticated(error?.response?.data?.message);
        console.log("Respons:", error?.response?.data?.message);
        throw error;
      }
    },
  });
  if (isLoading) {
    return (
      <div className="h-screen flex items-center justify-center">
        <CirclesWithBar
          height="100"
          width="100"
          color="#4fa94d"
          wrapperStyle={{}}
          wrapperClass=""
          visible={true}
          outerCircleColor=""
          innerCircleColor=""
          barColor=""
          ariaLabel="circles-with-bar-loading"
        />
      </div>
    );
  }
  // console.log(finalizeSongs);
  return (
    <div className="p-5 bg-white shadow-md rounded-md">
      {finalizeSongs?.data.length > 0 ? (
        <div className="flex flex-col gap-2">
          {finalizeSongs?.data?.map((song, i) => {
            return <SongCard key={i} song={song}></SongCard>;
          })}
        </div>
      ) : (
        <h4 className="text-center font-semibold text-xl text-gray-300 py-24">
          No song available
        </h4>
      )}
      <div className="flex justify-between items-center mt-10">
        <div className="flex items-center">
          <h3 className="me-5  font-semibold">Show Rows:</h3>
          <div>
            <select className="select select-bordered w-full max-w-xs album-data-heading">
              <option selected>10 Items</option>
              <option>20 Items</option>
              <option>30 Items</option>
            </select>
          </div>
        </div>
        <div>
          <div className="join">
            <button className="join-item btn btn-active">1</button>
            <button className="join-item btn ">2</button>
            <button className="join-item btn">3</button>
            <button className="join-item btn">4</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Finalize;
