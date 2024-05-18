import React from "react";
import { IoAlertCircleOutline } from "react-icons/io5";
import { FiEdit } from "react-icons/fi";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import BASEURL from "../../../../Constants";
import { Link } from "react-router-dom";

const CorrectionRequested = ({ song }) => {
  const id = localStorage.getItem("user_id");

  const correctionData = [
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
    <div className="bg-white p-5 my-5 rounded">
      <div className="flex items-center over-view-title">
        <span className="me-3">
          <IoAlertCircleOutline />
        </span>
        <h1>Correction Requested</h1>
      </div>
      {song?.map((item, index) => {
        // Parse the createdAt date string
        const createdAtDate = new Date(item?.createdAt);

        // Format the date in the desired format
        const formattedDate = `${createdAtDate.toLocaleString("en-US", {
          month: "short",
        })} ${createdAtDate.getDate()}, ${createdAtDate.getFullYear()}`;
        return (
          <div className="bg-[#F7F7FF] p-3 my-3 rounded" key={index}>
            <div className="flex items-center justify-between">
              <div>
                <p>{formattedDate}</p>
                <h2 className="news-title">{item.releaseTitle}</h2>
              </div>
              <span>
               <Link to={`/my-upload/correction/${item?._id}`}> <FiEdit /></Link>
              </span>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default CorrectionRequested;
