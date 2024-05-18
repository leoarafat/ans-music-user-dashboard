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
  const { data: showArtistList = [], isLoading, refetch } = useQuery({
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
        setAuthenticated(error?.response?.data?.message);
        console.log("Respons:", error?.response?.data?.message);
        throw error;
      }
    },
  });
    // console.log(showArtistList)
  const data = [
    {
      id: 1,
      name: "John Doe",
      instagramId: "@johndoe",
      spotifyId: "johndoe123",
      appleId: "johndoe",
      facebookUrl: "https://www.facebook.com/johndoe",
      action: "edit",
    },
    {
      id: 2,
      name: "Jane Smith",
      instagramId: "@janesmith",
      spotifyId: "janesmith456",
      appleId: "janesmith",
      facebookUrl: "https://www.facebook.com/janesmith",
      action: "edit",
    },
    {
      id: 3,
      name: "Bob Johnson",
      instagramId: "@bobjohnson",
      spotifyId: "bobjohnson789",
      appleId: "bobjohnson",
      facebookUrl: "https://www.facebook.com/bobjohnson",
      action: "edit",
    },
    {
      id: 4,
      name: "Alice Brown",
      instagramId: "@alicebrown",
      spotifyId: "alicebrown012",
      appleId: "alicebrown",
      facebookUrl: "https://www.facebook.com/alicebrown",
      action: "edit",
    },
    {
      id: 5,
      name: "Charlie Wilson",
      instagramId: "@charliewilson",
      spotifyId: "charliewilson345",
      appleId: "charliewilson",
      facebookUrl: "https://www.facebook.com/charliewilson",
      action: "edit",
    },
    {
      id: 6,
      name: "Eva Martinez",
      instagramId: "@evamartinez",
      spotifyId: "evamartinez678",
      appleId: "evamartinez",
      facebookUrl: "https://www.facebook.com/evamartinez",
      action: "edit",
    },
    {
      id: 7,
      name: "David Lee",
      instagramId: "@davidlee",
      spotifyId: "davidlee901",
      appleId: "davidlee",
      facebookUrl: "https://www.facebook.com/davidlee",
      action: "edit",
    },
    {
      id: 8,
      name: "Grace Taylor",
      instagramId: "@gracetaylor",
      spotifyId: "gracetaylor234",
      appleId: "gracetaylor",
      facebookUrl: "https://www.facebook.com/gracetaylor",
      action: "edit",
    },
    {
      id: 9,
      name: "Frank Adams",
      instagramId: "@frankadams",
      spotifyId: "frankadams567",
      appleId: "frankadams",
      facebookUrl: "https://www.facebook.com/frankadams",
      action: "edit",
    },
    {
      id: 10,
      name: "Olivia White",
      instagramId: "@oliviawhite",
      spotifyId: "oliviawhite890",
      appleId: "oliviawhite",
      facebookUrl: "https://www.facebook.com/oliviawhite",
      action: "edit",
    },
  ];
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
        {editItemId === item.id ? (
          <div className="col-span-7">
            <ArtistEdit setEditItemId={setEditItemId} refetch={refetch} item={item} /> {/* Render the item being edited */}
          </div>
        ) : !editItemId && ( // Render only if not in edit mode
          <>
            <p>{item.primaryArtistId}</p>
            <p>{item.primaryArtistName}</p>
            <p>{item.primaryArtistYoutubeId}</p>
            <p>{item.primaryArtistSpotifyId}</p>
            <p>{item.primaryArtistAppleId}</p>
            <p className="overflow-scroll">{item.primaryArtistFacebookId}</p>
            <p
              className="m-auto cursor-pointer"
              onClick={() => handleEdit(item.id)}
            >
              <FaRegEdit />
            </p>
          </>
        )}
      </div>
    ))}
  </div>
  );
};

export default PrimaryArtist;
