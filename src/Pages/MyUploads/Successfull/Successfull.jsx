import React from "react";
import {
  FaRegLightbulb,
  FaMusic,
  FaUser,
  FaEye,
  FaRegEdit,
} from "react-icons/fa";
import { RiDeleteBinLine } from "react-icons/ri";
import BASEURL from "../../../../Constants";
import { BsThreeDotsVertical } from "react-icons/bs";
import { CiFilter } from "react-icons/ci";
import { Link } from "react-router-dom";
import { CirclesWithBar } from "react-loader-spinner";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
const Successfull = () => {
  const id = localStorage.getItem("user_id");

  // <<<<<<<<< Profile info Data Recived >>>>>>>>>>
  const { data: successReleases = [], isLoading } = useQuery({
    queryKey: ["successReleases"],
    queryFn: async () => {
      try {
        const response = await axios.get(
          `${BASEURL}/user/successful-release/${id}`,
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
  // console.log(successReleases.data);
  return (
    <div className="p-5 bg-white shadow-md rounded-md">
      {successReleases?.data.length > 0 ? (
        <div className="flex flex-col gap-2">
          {successReleases?.data?.map((release, index) => (
            <>
              {" "}
              <div className="grid grid-cols-7 gap-5 tab-data">
                <div className="w-[141px] h-[118px]">
                  <img
                    className="w-[141px] h-[118px]"
                    src={release?.image}
                    alt="Logo"
                  />
                </div>
                <div className="py-3">
                  <h2 className="album-name">{release?.releaseTitle}</h2>
                  {/* <p className="value-color-data">{releaseTitle}</p> */}
                  <p className="value-color-data mt-2">{release?.subtitle}</p>
                </div>
                <div className="py-3">
                  <h2 className="album-data-heading">Created by</h2>
                  <p className="album-data-value">{release?.user.name}</p>
                </div>
                <div className="py-3">
                  <h2 className="album-data-heading">Label</h2>
                  <p className="album-data-value">
                    {release?.label?.labelName}
                  </p>
                  <p className="album-data-value">
                    {release?.label?.updatedAt}
                  </p>
                </div>
                <div className="py-3">
                  <h2 className="album-data-heading">Catalog number </h2>
                  <p className="album-data-value ">
                    <span>{release?.catalogNumber} </span>
                    {/* <span>Id:416651</span> */}
                  </p>
                </div>
                <div className="py-3">
                  <h2 className="album-data-heading">Stores</h2>
                  {release?.audio?.path && (
                    <p className="album-data-value flex items-center">
                      <span className="text-xl">
                        <FaMusic />
                      </span>
                      <span className="ms-5">
                        {" "}
                        {getFileNameFromUrl(release?.audio?.path)}
                      </span>
                    </p>
                  )}
                  {release?.audio?.length > 0 && (
                    <>
                      {release?.audio.map((item, i) => {
                        return (
                          <p
                            key={i}
                            className="album-data-value flex items-center"
                          >
                            <span className="text-xl">
                              <FaMusic />
                            </span>
                            <span className="ms-5">
                              {getFileNameFromUrl(item?.path)}
                            </span>
                          </p>
                        );
                      })}
                    </>
                  )}
                </div>
              </div>
            </>
          ))}
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

export default Successfull;
