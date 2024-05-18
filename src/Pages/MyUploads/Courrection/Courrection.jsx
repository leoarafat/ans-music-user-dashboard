import React from "react";
import { FaMusic } from "react-icons/fa";
import BASEURL from "../../../../Constants";
import { CirclesWithBar } from "react-loader-spinner";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import SongCard from "../SongCard/SongCard";
const Corrections = () => {
  const id = localStorage.getItem("user_id");

  // <<<<<<<<< Profile info Data Recived >>>>>>>>>>
  const { data: correctionRelease = [], isLoading } = useQuery({
    queryKey: ["correctionRelease"],
    queryFn: async () => {
      try {
        const response = await axios.get(
          `${BASEURL}/user/correction-release/${id}`,
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
  const getFileNameFromUrl = (url) => {
    const pathname = new URL(url).pathname;
    const parts = pathname.split("/");
    return parts[parts.length - 1];
  };
  console.log(correctionRelease);
  return (
    <div className="p-5 bg-white shadow-md rounded-md">
      {correctionRelease?.data.length > 0 ? (
        <div className="flex flex-col gap-2">
        {correctionRelease?.data?.map((song, i) => {
            return <SongCard key={i} song={song}></SongCard>;
          })}
        </div>
      ) : (
        <h4 className="text-center font-semibold text-xl text-gray-300 py-24">
          No song available
        </h4>
      )}
    </div>
  );
};

export default Corrections;
