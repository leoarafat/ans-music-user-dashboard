import React, { useContext, useEffect, useState } from "react";
import { MdOutlineSkipNext } from "react-icons/md";
import { RiSkipBackMiniLine } from "react-icons/ri";
import { FaRegEdit } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { AuthContext } from "../../../context/AuthProvider";
import BASEURL from "../../../../Constants";

import { useParams } from 'react-router-dom';
import Loader from "../../Shared/Loader/Loader";

const ViewDetails = ({ handleTabChange }) => {
  // ===============================================
  // This code for only date and time separate
  //============================================

  let { id } = useParams(); 

      // <<<<<<<<< Profile info Data Recived >>>>>>>>>>
      const { data: albumDetails = [], isLoading } = useQuery({
        queryKey: ["albumDetails"],
        queryFn: async () => {
          try {
            const response = await axios.get(
              `${BASEURL}/user/single-music/${id}`,
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
      if(isLoading){
        return<Loader></Loader>
      }
      console.log("details:", albumDetails?.data);
  return (
    <div className="capitalize">
      <div className="bg-white p-4 rounded-t">
        <h4 className="font-semibold text-3xl capitalize my-3">
          Your Song Details
        </h4>
      </div>
      {/* 1st step  */}
      <div className="ll bg-white  p-4 rounded shadow">
        <h4 className="flex items-center my-3 text-lg gap-3 font-bold">
          Release Information
        </h4>
        <div className="item_box grid grid-cols-2 gap-4">
          {/* item  */}
          <div className="item flex flex-col gap-1">
            <p className="text-sm font-semibold text-gray-400">
              Release Title *
            </p>
            <p className="font-semibold text-sm">{albumDetails?.data?.releaseTitle}</p>
          </div>
          {/* item  */}
          <div className="item flex flex-col gap-1">
            <p className="text-sm font-semibold text-gray-400">Genre *</p>
            <p className="font-semibold text-sm">{albumDetails?.data?.genre}</p>
          </div>
          {/* item  */}
          <div className="item flex flex-col gap-1">
            <p className="text-sm font-semibold text-gray-400">
              Version/Subtitle *
            </p>
            <p className="font-semibold text-sm">{albumDetails?.data?.subtitle}</p>
          </div>
          {/* item  */}
          <div className="item flex flex-col gap-1">
            <p className="text-sm font-semibold text-gray-400">Subgenre *</p>
            <p className="font-semibold text-sm">{albumDetails?.data?.subGenre}</p>
          </div>
          {/* item  */}
          <div className="item flex flex-col gap-1">
            <p className="text-sm font-semibold text-gray-400">
              Primary Artist *
            </p>
            <p className="font-semibold text-sm flex flex-col gap-1">
              {albumDetails?.data?.primaryArtist?.map((item, i) => {
                return (
                  <span>
                  {item?.primaryArtistName}
                  </span>
                );
              })}
            </p>
          </div>
          {/* item  */}
          <div className="item flex flex-col gap-1">
            <p className="text-sm font-semibold text-gray-400">Writers *</p>
            <p className="font-semibold text-sm flex flex-col gap-1">
              {albumDetails?.data?.writer?.map((item, i) => {
                return (
                  <span>
                    {item?.writerName}
                  </span>
                );
              })}
            </p>
          </div>
          {/* item  */}
          <div className="item flex flex-col gap-1">
            <p className="text-sm font-semibold text-gray-400">
              MusicDirectors *
            </p>
            <p className="font-semibold text-sm flex flex-col gap-1">
              {albumDetails?.data?.musicDirector?.map((item, i) => {
                return (
                  <span>
                     {item?.musicDirectorName}
                  </span>
                );
              })}
            </p>
          </div>
          {/* item  */}
          <div className="item flex flex-col gap-1">
            <p className="text-sm font-semibold text-gray-400">Producers *</p>
            <p className="font-semibold text-sm flex flex-col gap-1">
              {albumDetails?.data?.producer?.map((item, i) => {
                return (
                  <span>
                     {item?.producerName}
                  </span>
                );
              })}
            </p>
          </div>
          {/* item  */}
          <div className="item flex flex-col gap-1">
            <p className="text-sm font-semibold text-gray-400">Composers *</p>
            <p className="font-semibold text-sm flex flex-col gap-1">
              {albumDetails?.data?.composer?.map((item, i) => {
                return (
                  <span> {item?.composerName}
                  </span>
                );
              })}
            </p>
          </div>
          {/* item  */}
          <div className="item flex flex-col gap-1">
            <p className="text-sm font-semibold text-gray-400">Publisher *</p>
            <p className="font-semibold text-sm">{albumDetails?.data?.publisher}</p>
          </div>
          {/* item  */}
          <div className="item flex flex-col gap-1">
            <p className="text-sm font-semibold text-gray-400">C Line *</p>
            <p className="font-semibold text-sm">{albumDetails?.data?.line}</p>
          </div>
          {/* item  */}
          <div className="item flex flex-col gap-1">
            <p className="text-sm font-semibold text-gray-400">Format *</p>
            <p className="font-semibold text-sm">{"Audio"}</p>
          </div>
          {/* item  */}
          <div className="item flex flex-col gap-1">
            <p className="text-sm font-semibold text-gray-400">P Line *</p>
            <p className="font-semibold text-sm">{albumDetails?.data?.line_2}</p>
          </div>
          {/* item  */}
          <div className="item flex flex-col gap-1">
            <p className="text-sm font-semibold text-gray-400">UPC/EAN*</p>
            <p className="font-semibold text-sm">{albumDetails?.data?.upcEan}</p>
          </div>
          {/* item  */}
          <div className="item flex flex-col gap-1">
            <p className="text-sm font-semibold text-gray-400">
              Production Year *
            </p>
            <p className="font-semibold text-sm">{albumDetails?.data?.productionYear}</p>
          </div>
          {/* item  */}
          <div className="item flex flex-col gap-1">
            <p className="text-sm font-semibold text-gray-400">Label Name*</p>
            <p className="font-semibold text-sm">{albumDetails?.data?.label.labelName}</p>
          </div>
          {/* item  */}
          <div className="item flex flex-col gap-1">
            <p className="text-sm font-semibold text-gray-400">Song *</p>
            <div className="pt-5">
            <audio controls>
                  <source
                    src={albumDetails?.data?.audio}
                    type="audio/mp3"
                  />
                  Your browser does not support the audio element.
                </audio>
            </div>
          </div>
          {/* item  */}
          <div className="item flex flex-col gap-1">
            <p className="text-sm font-semibold text-gray-400">Cover Image *</p>
            <img
                src={albumDetails?.data?.image}
                alt="Selected Image"
                className="w-20 h-20 shadow "
              />
          </div>
        </div>
      </div>
      {/* 2st step  */}
      <div className="ll bg-white  p-4 rounded shadow my-2">
        <h4 className="flex items-center my-3 text-lg gap-3 font-bold">
          Release Date & Times
          {/* <span onClick={() => handleTabChange(3)} className="cursor-pointer">
            <FaRegEdit />
          </span> */}
        </h4>
        <div className="item_box grid grid-cols-2 gap-4 ">
          {/* item  */}
          <div className="item flex flex-col gap-1 pb-11">
            <p className="text-sm font-semibold text-gray-400">
              Release Date *
            </p>
            <p className="font-semibold text-sm">{albumDetails?.data?.releaseDate}</p>
          </div>
          {/* item  */}
          {/* <div className="item flex flex-col gap-1">
            <p className="text-sm font-semibold text-gray-400">
              Release Time *
            </p>
            <p className="font-semibold text-sm">{albumDetails?.data?.formattedTime}</p>
          </div> */}
        </div>
      </div>

      {/* <div className="button_box bg-white p-4  py-8 rounded flex items-center justify-between  pt-8">
        <button
          onClick={() => handleTabChange(3)}
          type="button"
          className="btn btn-sm btn-outline btn-success flex items-center gap-1"
        >
          {" "}
          <span className="text-xl">
            <RiSkipBackMiniLine />{" "}
          </span>
          Back
        </button>
        <button
          onClick={handleReleaseSong}
          type="button"
          className="btn btn-sm btn-outline btn-success flex items-center gap-1"
        >
          Release
          <span className="text-xl">
            <MdOutlineSkipNext />
          </span>
        </button>
      </div> */}
    </div>
  );
};

export default ViewDetails;
