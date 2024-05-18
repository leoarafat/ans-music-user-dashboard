import React from "react";
import { FaRegDotCircle } from "react-icons/fa";
import { HiDotsVertical } from "react-icons/hi";
import { LuPencil } from "react-icons/lu";
import { MdOutlineRemoveRedEye } from "react-icons/md";
import { FaUserCheck } from "react-icons/fa";
import { Link } from "react-router-dom";
import {
  FaRegLightbulb,
  FaMusic,
  FaUser,
  FaEye,
  FaRegEdit,
} from "react-icons/fa";
import image1 from "../../../assets/tab-data-pic/1.png";

const SongCard = ({ song }) => {
  const { releaseTitle, publisher, audio, image, subtitle, label, _id } = song;
  // console.log(song);
  const getFileNameFromUrl = (url) => {
    const pathname = new URL(url).pathname.slice(0, 20);
    const parts = pathname.split("/");
    return parts[parts.length - 1];
  };
  return (
    <div className="grid grid-cols-7 gap-5 tab-data">
      <div className="w-[141px] h-[118px]">
        <img
          className="w-[141px] h-[118px]"
          src={image ? image : image1}
          alt="Logo"
        />
      </div>
      <div className="py-3">
        <h2 className="album-name">{releaseTitle}</h2>
        {/* <p className="value-color-data">{releaseTitle}</p> */}
        <p className="value-color-data mt-2">{subtitle}</p>
      </div>
      <div className="py-3">
        <h2 className="album-data-heading">Created by</h2>
        <p className="album-data-value">{publisher}</p>
      </div>
      <div className="py-3">
        <h2 className="album-data-heading">Label</h2>
        <p className="album-data-value">{label?.labelName}</p>
        <p className="album-data-value">{label?.updatedAt}</p>
      </div>
      <div className="py-3">
        <h2 className="album-data-heading">Catalog number </h2>
        <p className="album-data-value ">
          <span>Cat# :TEC3001 744662925003 Release </span>
          <span>Id:416651</span>
        </p>
      </div>
      <div className="py-3">
        <h2 className="album-data-heading">Stores</h2>
        {audio?.path && (
          <p className="album-data-value flex items-center">
            <span className="text-xl">
              <FaMusic />
            </span>
            <span className="ms-5"> {getFileNameFromUrl(audio?.path)}</span>
          </p>
        )}
        {audio?.length > 0 && (
          <>
            {audio.map((item, i) => {
              return (
                <p key={i} className="album-data-value flex items-center">
                  <span className="text-xl">
                    <FaMusic />
                  </span>
                  <span className="ms-5">{getFileNameFromUrl(item?.path)}</span>
                </p>
              );
            })}
          </>
        )}
        {/* <p className="album-data-value flex items-center">
          <FaMusic /> <span className="ms-5">220 terrs</span>
        </p>
        <p className="album-data-value flex items-center">
          <FaMusic /> <span className="ms-5">21 Stored</span>
        </p> */}
      </div>
      <div className="dropdown dropdown-bottom dropdown-end  text-blue">
        <div
          tabIndex={0}
          role="button"
          className="m-1 font-bold text-xl flex items-center justify-center h-full"
        >
          <HiDotsVertical />
        </div>
        <ul
          tabIndex={0}
          className="dropdown-content z-[1] flex flex-col p-2 shadow bg-white rounded w-52"
        >
          <Link to={`correction/${_id}`}>
            <li className="flex hover:bg-green-100 text-[#8774F9] items-center gap-2 cursor-pointer p-2 ">
              <span>
                <LuPencil />
              </span>
              <a>Edit Details</a>
            </li>
          </Link>
          <Link to={_id}>
            <li className="flex hover:bg-green-100 text-[#36C893] items-center gap-2 cursor-pointer p-2 ">
              <span>
                <MdOutlineRemoveRedEye />
              </span>
              <a>View Details</a>
            </li>
          </Link>
        </ul>
      </div>
    </div>
  );
};

export default SongCard;
