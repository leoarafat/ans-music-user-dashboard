import React, { useState } from "react";
import { FaRegEdit } from "react-icons/fa";
import ArtistEdit from "./ArtistEdit";

import { CirclesWithBar } from "react-loader-spinner";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import BASEURL from "../../../Constants";

const PrimaryArtist = () => {
  const [editItemId, setEditItemId] = useState(null);
  const id = localStorage.getItem("user_id");

  // <<<<<<<<< Profile info Data Recived >>>>>>>>>>
  const {
    data: showArtistList = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["showArtistList"],
    queryFn: async () => {
      try {
        const response = await axios.get(`${BASEURL}/manage/get-artist/${id}`, {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: localStorage.getItem("token"),
          },
        });
        return response.data;
      } catch (error) {
        console.log("Respons:", error?.response?.data?.message);
        throw error;
      }
    },
  });

  const handleEdit = (itemId) => {
    setEditItemId(itemId); // Set the ID of the item being edited
  };
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
  return (
    <div className="bg-white p-5">
      {!editItemId && (
        <div className="grid grid-cols-7 mb-5 text-center">
          <div className="flex items-center text-color justify-center">
            <h2>ID</h2>
          </div>
          <h2 className="text-color">Name</h2>
          <h2 className="text-color">Instagram ID</h2>
          <h2 className="text-color">Spotify ID</h2>
          <h2 className="text-color">Apple ID</h2>
          <h2 className="text-color">Facebook URL</h2>
          <h2 className="text-color">Action</h2>
        </div>
      )}

      {showArtistList?.data?.map((item, index) => (
        <div
          key={index}
          className="manage-label-data grid grid-cols-7 mb-4 text-center"
        >
          {editItemId === item._id ? (
            <div className="col-span-7">
              <ArtistEdit
                setEditItemId={setEditItemId}
                refetch={refetch}
                item={item}
              />{" "}
              {/* Render the item being edited */}
            </div>
          ) : (
            !editItemId && ( // Render only if not in edit mode
              <>
                <p>{item.primaryArtistId}</p>
                <p>{item.primaryArtistName}</p>
                <p>{item.primaryArtistYoutubeId}</p>
                <p>{item.primaryArtistSpotifyId}</p>
                <p>{item.primaryArtistAppleId}</p>
                <p className="overflow-scroll">
                  {item.primaryArtistFacebookId}
                </p>
                <p
                  className="m-auto cursor-pointer"
                  onClick={() => handleEdit(item?._id)}
                >
                  <FaRegEdit />
                </p>
              </>
            )
          )}
        </div>
      ))}
    </div>
  );
};

export default PrimaryArtist;
