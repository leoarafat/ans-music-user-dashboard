import React from "react";
import { FaRegEdit } from "react-icons/fa";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import BASEURL from "../../../../Constants";
import { Link } from "react-router-dom";

const ApprovedTracks = () => {
  const id = localStorage.getItem("user_id");
  // <<<<<<<<< Profile info Data Recived >>>>>>>>>>
  const {
    data: lastSixApprovedTrack = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["lastSixApprovedTrack"],
    queryFn: async () => {
      try {
        const response = await axios.get(
          `${BASEURL}/user/last-six-approved-track/${id}`,
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
  console.log(lastSixApprovedTrack);
  const trackData = [
    {
      date: "15-03-2024",
      albumName: "Allbum Name",
    },
    {
      date: "15-03-2024",
      albumName: "Allbum Name",
    },
    {
      date: "15-03-2024",
      albumName: "Allbum Name",
    },
    {
      date: "15-03-2024",
      albumName: "Allbum Name",
    },
    {
      date: "15-03-2024",
      albumName: "Allbum Name",
    },
    {
      date: "15-03-2024",
      albumName: "Allbum Name",
    },
    {
      date: "15-03-2024",
      albumName: "Allbum Name",
    },
  ];
  return (
    <div className="bg-white p-5 my-3 rounded">
      <div className="grid grid-cols-2 gap-5">
        <div className="approved-tract-inner">
          <div className="flex items-center approved-tract-title">
            <h2 className="me-2">Last 6 Approved Tracks</h2>
            <span>
              <FaRegEdit />
            </span>
          </div>
          <div className="approved-tract-circle">
            <p className="circle-text ">06</p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-2">
          {lastSixApprovedTrack?.data?.slice(0, 6).map((item, index) => {
            // Parse the createdAt date string
            const createdAtDate = new Date(item?.createdAt);

            // Format the date in the desired format
            const formattedDate = `${createdAtDate.toLocaleString("en-US", {
              month: "short",
            })} ${createdAtDate.getDate()}, ${createdAtDate.getFullYear()}`;
            return (
              <div
                key={index}
                className="bg-[#F7F7FF] p-2 rounded w-full flex items-center justify-between"
              >
                <div>
                  <p>{formattedDate}</p>
                  <h2 className="news-title">{item.releaseTitle}</h2>
                </div>
                <span>
                  <Link to={`/my-upload/correction/${item?._id}`}>
                    {" "}
                    <FaRegEdit />
                  </Link>
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default ApprovedTracks;
