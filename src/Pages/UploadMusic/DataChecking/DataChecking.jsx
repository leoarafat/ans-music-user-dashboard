import React, { useContext, useEffect, useState } from "react";
import { MdOutlineSkipNext } from "react-icons/md";
import { RiSkipBackMiniLine } from "react-icons/ri";
import { FaRegEdit } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import axios from "axios";
import BASEURL from "../../../../Constants";
import { AuthContext } from "../../../context/AuthProvider";
import { Audio } from "react-loader-spinner";
import Loader from "../../Shared/Loader/Loader";

const DataChecking = ({ handleTabChange }) => {
  const { uploadData, setUploadData, albumSong, setAlbumSong, uploadInfo, setUploadInfo, startDate, setStartDate } =
    useContext(AuthContext);

  const navigate = useNavigate();
  // ===============================================
  // This code for only date and time separate
  //============================================
  const [originalDateString, setOriginalDateString] = useState(startDate);
  const [formattedDate, setFormattedDate] = useState("");
  const [formattedTime, setFormattedTime] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    // Create a new Date object from the original date string
    const originalDate = new Date(originalDateString);

    // Extract day, month, and year from the original date object
    const day = originalDate.getDate();
    const month = originalDate.getMonth() + 1; // Months are zero-based, so add 1
    const year = originalDate.getFullYear();

    // Extract hours, minutes, and seconds from the original date object
    const hours = originalDate.getHours();
    const minutes = originalDate.getMinutes();
    const seconds = originalDate.getSeconds();

    // Add leading zeros if needed
    const formattedDay = day < 10 ? "0" + day : day;
    const formattedMonth = month < 10 ? "0" + month : month;
    const formattedHours = hours < 10 ? "0" + hours : hours;
    const formattedMinutes = minutes < 10 ? "0" + minutes : minutes;
    const formattedSeconds = seconds < 10 ? "0" + seconds : seconds;

    // Format the date as MM-DD-YYYY
    const formattedDate = `${formattedMonth}-${formattedDay}-${year}`;

    // Format the time as HH:MM:SS
    const formattedTime = `${formattedHours}:${formattedMinutes}:${formattedSeconds}`;

    // Update the state with the formatted date and time
    setFormattedDate(formattedDate);
    setFormattedTime(formattedTime);
  }, [originalDateString]);
  const {
    radio_1,
    radio_2,
    radio_3,
    radio_4,
    radio_5,
    selects,
    writers,
    composers,
    musicDirectors,
    producers,
    release_title,
    subtitle,
    line_1,
    line_2,
    world,
    upc_ean,
    sub_genre,
    producer_catalouge_number,
    production_year,
    label_name,
    publisher,
    track_language,
    isrc,
    tiktalk_preview,
  } = uploadInfo; // input value distracted
  // console.log("1st step Single:", uploadData);
  console.log("1st step Album:", uploadInfo);
  // ===================================================
  // <<<<<<<<<<<<<<<< Release single song here >>>>>>>>>
  // ===================================================
  const handleReleaseSong = async () => {
    setIsLoading(true);
    const formData = new FormData();
    const image = uploadData?.selectedImage;
    const audio = uploadData?.selectedFile;
    const data = {
      user: localStorage.getItem("user_id"),
      status: true,
      trackType: radio_1,
      isRelease: radio_4,
      instrumental: radio_2,
      secondaryTrackType: radio_5,
      parentalAdvisory: radio_3,
      releaseTitle: release_title,
      subtitle: subtitle,
      line: line_1,
      primaryArtist: selects,
      // inspection: "saved",
      // primaryArtistSpotifyId: "N/A",
      // primaryArtistAppleId: "N/A",
      // primaryArtistFacebookId: "N/A",
      // primaryArtistYoutubeId: "N/A",
      writer: writers,
      composer: composers,
      musicDirector: musicDirectors,
      producer: producers,
      actor: "N/A",
      filmDirector: "N/A",
      genre: world,
      upcEan: upc_ean,
      subGenre: sub_genre,
      producerCatalogNumber: "N/A",
      productionYear: production_year,
      label: label_name,
      publisher: publisher,
      youtubeUrl: "N/A",
      isrc: isrc,
      catalogNumber: producer_catalouge_number,
      tiktokStartInSecond: tiktalk_preview,
      trackLanguage: track_language,
      releaseDate: formattedDate,
      isAdvancePurchase: true,
      advancePurchaseDate: "N/A",
      // isApproved: "pending",
      correctionNote: [],
      // tackDown: null,
      // songStatus: "distribute",
    };

    console.log(data);
    if (image) {
      console.log("images", image);
      formData.append("image", image);
    }
    if (audio) {
      console.log("audio", audio);
      formData.append("audio", audio);
    }
    formData.append("data", JSON.stringify(data));

    try {
      const response = await axios.post(
        `${BASEURL}/single-music/upload`,
        formData,
        {
          headers: {
            Accept: "application/json",
            "Content-Type": "multipart/form-data",
            Authorization: localStorage.getItem("token"),
          },
        }
      );
      console.log(response.data);
      toast.success(`${response.data.message}`);
      if (response.data.success) {
        setIsLoading(false);
        setUploadData({})
        // setUploadInfo({})
        navigate("/my-upload");
      }
      return response.data;
    } catch (error) {
      console.log(error.response.data);
      toast.error(`${error.response.data.message}`);
      setIsLoading(false);
      throw new Error(error.response.data.message);
    }
  };
  console.log(uploadInfo);
  // ===================================================
  // <<<<<<<<<<<<<<<< Release Album song here >>>>>>>>>
  // ===================================================
  const handleReleaseAlbum = async () => {
    setIsLoading(true);
    const formData = new FormData();
    const image = albumSong?.selectedImage;
    const selectedAudio = albumSong?.selectedAudio;

    const data = {
      user: localStorage.getItem("user_id"),
      status: true,
      trackType: radio_1,
      isRelease: radio_4,
      instrumental: radio_2,
      secondaryTrackType: radio_5,
      parentalAdvisory: radio_3,
      releaseTitle: release_title,
      subtitle: subtitle,
      line: line_1,
      primaryArtist: selects,
      writer: writers,
      composer: composers,
      musicDirector: musicDirectors,
      producer: producers,
      actor: "N/A",
      filmDirector: "N/A",
      genre: world,
      upcEan: upc_ean,
      subGenre: sub_genre,
      producerCatalogNumber: "N/A",
      productionYear: production_year,
      label: label_name,
      publisher: publisher,
      youtubeUrl: "N/A",
      isrc: isrc,
      catalogNumber: producer_catalouge_number,
      tiktokStartInSecond: tiktalk_preview,
      trackLanguage: track_language,
      releaseDate: formattedDate,
      isAdvancePurchase: true,
      advancePurchaseDate: "N/A",
      correctionNote: [],
      tackDown: "N/A",
    };

    // Append file data (image and audio)
    if (image) {
      formData.append("image", image);
    }
    // console.log(selectedAudio);
    selectedAudio.forEach((audio) => {
      formData.append("audio", audio.audio);
      formData.append("title", audio.title);
      formData.append("artist", audio.artist);
    });
    formData.append("data", JSON.stringify(data));
    try {
      const response = await axios.post(`${BASEURL}/album/upload`, formData, {
        headers: {
          Accept: "application/json",
          "Content-Type": "multipart/form-data",
          Authorization: localStorage.getItem("token"),
        },
      });
      console.log(response.data);
      toast.success(`${response.data.message}`);
      setIsLoading(false);
      if (response.data.message) {
        setAlbumSong(null)
        navigate("/my-upload");
      }
      return response.data;
    } catch (error) {
      console.log(error.response.data);
      toast.error(`${error.response.data.message}`);
      setIsLoading(false);
      throw new Error(error.response.data.message);
    }
  };
  // console.log(albumSong);
  if (isLoading) {
    return <Loader></Loader>;
  }
  return (
    <div className="">
      <div className="bg-white p-4 rounded-t">
        <h4 className="font-semibold text-xl capitalize my-3">
          Finally check your data
        </h4>
        <span className="text-sm text-gray-400">
          To make your release better, review our feedback and any mistakes or
          information that we have found.
        </span>
      </div>
      {/* 1st step  */}
      <div className="ll bg-white  p-4 rounded shadow">
        <h4 className="flex items-center my-3 text-lg gap-3 font-bold">
          Release Information{" "}
          <span onClick={() => handleTabChange(2)} className="cursor-pointer">
            <FaRegEdit />
          </span>
        </h4>
        <div className="item_box grid grid-cols-2 gap-4">
          {/* item  */}
          <div className="item flex flex-col gap-1">
            <p className="text-sm font-semibold text-gray-400">
              Release Title *
            </p>
            <p className="font-semibold text-sm">{release_title}</p>
          </div>
          {/* item  */}
          <div className="item flex flex-col gap-1">
            <p className="text-sm font-semibold text-gray-400">Genre *</p>
            <p className="font-semibold text-sm">{world}</p>
          </div>
          {/* item  */}
          <div className="item flex flex-col gap-1">
            <p className="text-sm font-semibold text-gray-400">
              Version/Subtitle *
            </p>
            <p className="font-semibold text-sm">{subtitle}</p>
          </div>
          {/* item  */}
          <div className="item flex flex-col gap-1">
            <p className="text-sm font-semibold text-gray-400">Subgenre *</p>
            <p className="font-semibold text-sm">{sub_genre}</p>
          </div>
          {/* item  */}
          <div className="item flex flex-col gap-1">
            <p className="text-sm font-semibold text-gray-400">
              Primary Artist *
            </p>
            <p className="font-semibold text-sm flex flex-col gap-1">
              {selects?.map((item, i) => {
                return (
                  <span>
                     {item}
                  </span>
                );
              })}
            </p>
          </div>
          {/* item  */}
          <div className="item flex flex-col gap-1">
            <p className="text-sm font-semibold text-gray-400">Writers *</p>
            <p className="font-semibold text-sm flex flex-col gap-1">
              {writers?.map((item, i) => {
                return (
                  <span>
                    {item?.writerId}. {item?.writerName}
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
              {musicDirectors?.map((item, i) => {
                return (
                  <span>
                    {item?.musicDirectorId}. {item?.musicDirectorName}
                  </span>
                );
              })}
            </p>
          </div>
          {/* item  */}
          <div className="item flex flex-col gap-1">
            <p className="text-sm font-semibold text-gray-400">Producers *</p>
            <p className="font-semibold text-sm flex flex-col gap-1">
              {producers?.map((item, i) => {
                return (
                  <span>
                    {item?.producerId}. {item?.producerName}
                  </span>
                );
              })}
            </p>
          </div>
          {/* item  */}
          <div className="item flex flex-col gap-1">
            <p className="text-sm font-semibold text-gray-400">Composers *</p>
            <p className="font-semibold text-sm flex flex-col gap-1">
              {composers?.map((item, i) => {
                return (
                  <span>
                    {item?.composerId}. {item?.composerName}
                  </span>
                );
              })}
            </p>
          </div>
          {/* item  */}
          <div className="item flex flex-col gap-1">
            <p className="text-sm font-semibold text-gray-400">Publisher *</p>
            <p className="font-semibold text-sm">{publisher}</p>
          </div>
          {/* item  */}
          <div className="item flex flex-col gap-1">
            <p className="text-sm font-semibold text-gray-400">C Line *</p>
            <p className="font-semibold text-sm">{line_1}</p>
          </div>
          {/* item  */}
          <div className="item flex flex-col gap-1">
            <p className="text-sm font-semibold text-gray-400">Format *</p>
            <p className="font-semibold text-sm">{"Audio"}</p>
          </div>
          {/* item  */}
          <div className="item flex flex-col gap-1">
            <p className="text-sm font-semibold text-gray-400">P Line *</p>
            <p className="font-semibold text-sm">{line_2}</p>
          </div>
          {/* item  */}
          <div className="item flex flex-col gap-1">
            <p className="text-sm font-semibold text-gray-400">UPC/EAN*</p>
            <p className="font-semibold text-sm">{upc_ean}</p>
          </div>
          {/* item  */}
          <div className="item flex flex-col gap-1">
            <p className="text-sm font-semibold text-gray-400">
              Production Year *
            </p>
            <p className="font-semibold text-sm">{production_year}</p>
          </div>
          {/* item  */}
          <div className="item flex flex-col gap-1">
            <p className="text-sm font-semibold text-gray-400">Label Name*</p>
            <p className="font-semibold text-sm">{label_name}</p>
          </div>
          {/* item  */}
          {uploadData?.selectedFile && (
            <div className="item flex flex-col gap-1">
              <p className="text-sm font-semibold text-gray-400">Song *</p>
              <div className="pt-5">
                <audio controls>
                  <source
                    src={URL.createObjectURL(uploadData?.selectedFile)}
                    type="audio/mp3"
                  />
                  Your browser does not support the audio element.
                </audio>
              </div>
            </div>
          )}
          {/* item  */}
          {uploadData?.selectedImage && (
            <div className="item flex flex-col gap-1">
              <p className="text-sm font-semibold text-gray-400">
                Cover Image *
              </p>
              <img
                src={URL.createObjectURL(uploadData?.selectedImage)}
                alt="Selected Image"
                className="w-20 h-20 shadow "
              />
            </div>
          )}
        </div>
        {/* album data show  */}
        {albumSong?.selectedImage && (
          <div className="grid grid-cols-2 gap-4 mt-6">
            <div className="item flex flex-col gap-1">
              <p className="text-sm font-semibold text-gray-400">Album *</p>
              <div className="">
                {albumSong?.selectedAudio.length > 0 && (
                  <div className="flex flex-col gap-3">
                    {albumSong?.selectedAudio.map((song, i) => {
                      return (
                        <div key={i} className="l">
                          {/* <p className="flex flex-col gap-0 font-semibold capitalize">
                <span className="capitalize">{song.title}</span>
                <span className="text-green-500">{song.artist}</span>
              </p> */}
                          <audio controls>
                            <source
                              src={URL.createObjectURL(song?.audio)}
                              type="audio/mp3"
                            />
                            Your browser does not support the audio element.
                          </audio>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            </div>
            {/* item  */}
            <div className="item flex flex-col gap-1">
              <p className="text-sm font-semibold text-gray-400">
                Cover Image *
              </p>
              {albumSong?.selectedImage && (
                <img
                  src={URL.createObjectURL(albumSong?.selectedImage)}
                  alt="Selected Image"
                  className="w-20 h-20 shadow mt-5"
                />
              )}
            </div>
          </div>
        )}
      </div>
      {/* 2st step  */}
      <div className="ll bg-white  p-4 rounded shadow my-2">
        <h4 className="flex items-center my-3 text-lg gap-3 font-bold">
          Release Date & Times
          <span onClick={() => handleTabChange(3)} className="cursor-pointer">
            <FaRegEdit />
          </span>
        </h4>
        <div className="item_box grid grid-cols-2 gap-4 ">
          {/* item  */}
          <div className="item flex flex-col gap-1">
            <p className="text-sm font-semibold text-gray-400">
              Release Date *
            </p>
            <p className="font-semibold text-sm">{formattedDate}</p>
          </div>
          {/* item  */}
          {/* <div className="item flex flex-col gap-1">
            <p className="text-sm font-semibold text-gray-400">
              Release Time *
            </p>
            <p className="font-semibold text-sm">{formattedTime}</p>
          </div> */}
        </div>
      </div>

      <div className="button_box bg-white p-4  py-8 rounded flex items-center justify-between  pt-8">
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
        {uploadData?.selectedImage && (
          <button
            onClick={handleReleaseSong}
            type="button"
            className="btn btn-sm btn-outline btn-success flex items-center gap-1"
          >
            Release Song
            <span className="text-xl">
              <MdOutlineSkipNext />
            </span>
          </button>
        )}
        {albumSong?.selectedImage && (
          <button
            onClick={handleReleaseAlbum}
            type="button"
            className="btn btn-sm btn-outline btn-success flex items-center gap-1"
          >
            Release Album
            <span className="text-xl">
              <MdOutlineSkipNext />
            </span>
          </button>
        )}
      </div>
    </div>
  );
};

export default DataChecking;
