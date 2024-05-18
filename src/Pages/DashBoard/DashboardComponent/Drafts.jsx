import React from "react";
import { CiMusicNote1 } from "react-icons/ci";
import { FiEdit } from "react-icons/fi";
import image1 from "../../../assets/over-view/1.png";
import image2 from "../../../assets/over-view/2.png";
import image3 from "../../../assets/over-view/3.png";
import image4 from "../../../assets/over-view/4.png";
import image5 from "../../../assets/over-view/5.png";
import image6 from "../../../assets/over-view/6.png";
import { Link } from "react-router-dom";

const Drafts = ({ song }) => {
  const draftData = [
    {
      date: "15-03-2024",
      month: "jan",
      albumName: "Allbum Name",
      image: image1,
    },
    {
      date: "15-03-2024",
      month: "Feb",
      albumName: "Allbum Name",
      image: image2,
    },
    {
      date: "15-03-2024",
      month: "Feb",
      albumName: "Allbum Name",
      image: image3,
    },
    {
      date: "15-03-2024",
      month: "Feb",
      albumName: "Allbum Name",
      image: image4,
    },
    {
      date: "15-03-2024",
      month: "Feb",
      albumName: "Allbum Name",
      image: image5,
    },
    {
      date: "15-03-2024",
      month: "Feb",
      albumName: "Allbum Name",
      image: image6,
    },
  ];

  return (
    <div className="bg-white p-5 my-5 rounded">
      <div className="flex items-center over-view-title">
        <span className="me-3">
          <CiMusicNote1 />
        </span>
        <h1>Album Correction</h1>
      </div>
      {song?.length > 0 ? (
        <>
          {song?.map((item, index) => {
            // Parse the createdAt date string
            const createdAtDate = new Date(item?.createdAt);

            // Format the date in the desired format
            const formattedDate = `${createdAtDate.toLocaleString("en-US", {
              month: "short",
            })} ${createdAtDate.getDate()}, ${createdAtDate.getFullYear()}`;

            return (
              <div className="bg-[#F7F7FF] p-3 my-3 rounded" key={index}>
                <div className="flex items-center justify-between gap-2">
                  <div className="draf-imagedraf-image w-1/4">
                    <img
                      className="rounded-full w-full"
                      src={
                        item?.image ||
                        "https://png.pngtree.com/png-vector/20191126/ourmid/pngtree-love-song-icon-png-image_2036603.jpg"
                      }
                      alt="image"
                      onError={(e) => {
                        e.target.src =
                          "https://png.pngtree.com/png-vector/20191126/ourmid/pngtree-love-song-icon-png-image_2036603.jpg";
                      }}
                    />
                  </div>
                  <div>
                    <h2 className="news-title">{item?.releaseTitle}</h2>
                    {/* Display the formatted date */}
                    <p className="text-sm">Created on {formattedDate}</p>
                  </div>
                  <span>
                    {" "}
                    <Link to={`/my-upload/correction/${item?._id}`}>
                      {" "}
                      <FiEdit />
                    </Link>
                  </span>
                </div>
              </div>
            );
          })}
        </>
      ) : (
        <p className="my-2">No Album available</p>
      )}

      <div className="text-right">
        <button className="bg-[#DBFFDF] rounded-[3px] px-5">+ More</button>
      </div>
    </div>
  );
};

export default Drafts;
