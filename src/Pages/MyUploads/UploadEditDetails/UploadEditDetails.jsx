import React, { useContext, useEffect, useState } from "react";
import { FaRegCalendarCheck } from "react-icons/fa6";
import "react-datepicker/dist/react-datepicker.css";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import BASEURL from "../../../../Constants";
import axios from "axios";
import Loader from "../../Shared/Loader/Loader";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { MdOutlineSkipNext } from "react-icons/md";
import { RiSkipBackMiniLine } from "react-icons/ri";
import toast from "react-hot-toast";
import CreateArtistBox from "../../UploadMusic/InputUpload/CreateArtistBox/CreateArtistBox";

const UploadEditDetails = ({ setActiveTab, handleTabChange }) => {
  // const {  albumDetails?.data, set albumDetails?.data } = useState({});
  const [selects, setSelects] = useState([""]);
  const [writers, setWriters] = useState([""]);
  const [composers, setComposers] = useState([""]);
  const [musicDirectors, setMusicDirectors] = useState([""]);
  const [producers, setProducers] = useState([""]);
  const [startDate, setStartDate] = useState(new Date());
  const [formattedDate, setFormattedDate] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [loader, setLoader] = useState(false);
  let { id } = useParams();
  const userId = localStorage.getItem("user_id");
  
  useEffect(() => {
    // Create a new Date object from the original date string
    const originalDate = new Date(startDate);

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
  }, [startDate]);
  console.log(formattedDate);
  
  // <<<<<<<<< Profile info Data Recived >>>>>>>>>>
  const { data: albumDetails = [], isLoading, refetch } = useQuery({
    queryKey: ["albumDetails"],
    queryFn: async () => {
      try {
        const response = await axios.get(`${BASEURL}/user/single-music/${id}`, {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: localStorage.getItem("token"),
          },
        });
        return response.data;
      } catch (error) {
        // setAuthenticated(error?.response?.data?.message);
        console.log("Respons:", error?.response?.data?.message);
        throw error;
      }
    },
  });
  // <<<<<<<<< Profile info Data Recived >>>>>>>>>>
  const {
    data: showArtistList = [],
    isLoading: artistLoading,
    refetch:artistReFetch,
  } = useQuery({
    queryKey: ["showArtistList"],
    queryFn: async () => {
      try {
        const response = await axios.get(
          `${BASEURL}/manage/get-artist/${userId}`,
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
        setAuthenticated(error?.response?.data?.message);
        console.log("Respons:", error?.response?.data?.message);
        throw error;
      }
    },
  });
  // <<<<<<<<< Profile info Data Recived >>>>>>>>>>
  const { data: showLabelList = [] } = useQuery({
    queryKey: ["showLabelList"],
    queryFn: async () => {
      try {
        const response = await axios.get(
          `${BASEURL}/manage/get-label/${userId}`,
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
        setAuthenticated(error?.response?.data?.message);
        console.log("Respons:", error?.response?.data?.message);
        throw error;
      }
    },
  });

  console.log("details:", albumDetails?.data);


  const addSelect = () => {
    const newSelects = [...selects, ""];
    setSelects(newSelects);
  };
  console.log(selects);
  const deleteSelect = (index) => {
    const newSelects = [...selects];
    newSelects.splice(index, 1);
    setSelects(newSelects);
  };

  const handleSelectChange = (index, event) => {
    const { value } = event.target;
    const newSelects = [...selects];
    newSelects[index] = value;
    setSelects(newSelects);
  };



  const addWriter = () => {
    const newWriters = [...writers, { writerId: 1, writerName: "" }];
    setWriters(newWriters);
  };

  const deleteWriter = (index) => {
    const newWriters = [...writers];
    newWriters.splice(index, 1);
    setWriters(newWriters);
  };

  const handleWriterChange = (index, value) => {
    // console.log(index);
    const newWriters = [...writers];
    newWriters[index] = { writerId: index + 1, writerName: value };
    setWriters(newWriters);
  };

  // console.log(composers);

  const addComposer = () => {
    const newComposers = [...composers, { composerId: 1, composerName: "" }];
    setComposers(newComposers);
  };

  const deleteComposer = (index) => {
    const newComposers = [...composers];
    newComposers.splice(index, 1);
    setComposers(newComposers);
  };

  const handleComposerChange = (index, value) => {
    const newComposers = [...composers];
    newComposers[index] = { composerId: index + 1, composerName: value };
    setComposers(newComposers);
  };

  const addMusicDirector = () => {
    const newMusicDirectors = [
      ...musicDirectors,
      { musicDirectorId: 1, musicDirectorName: "" },
    ];
    setMusicDirectors(newMusicDirectors);
  };

  const deleteMusicDirector = (index) => {
    const newMusicDirectors = [...musicDirectors];
    newMusicDirectors.splice(index, 1);
    setMusicDirectors(newMusicDirectors);
  };

  const handleMusicDirectorChange = (index, value) => {
    const newMusicDirectors = [...musicDirectors];
    newMusicDirectors[index] = {
      musicDirectorId: index + 1,
      musicDirectorName: value,
    };
    setMusicDirectors(newMusicDirectors);
  };
  // console.log(musicDirectors);
  const addProducer = () => {
    const newProducers = [...producers, { producerId: 1, producerName: "" }];
    setProducers(newProducers);
  };

  const deleteProducer = (index) => {
    const newProducers = [...producers];
    newProducers.splice(index, 1);
    setProducers(newProducers);
  };

  const handleProducerChange = (index, value) => {
    const newProducers = [...producers];
    newProducers[index] = { producerId: index + 1, producerName: value };
    setProducers(newProducers);
  };

  const handleSubmitUpload = async (e) => {
    setLoader(true)
    e.preventDefault();
    const radio_1 = e.target.radio_1.value;
    const radio_2 = e.target.radio_2.value;
    const radio_3 = e.target.radio_3.value;
    const radio_4 = e.target.radio_4.value;
    const radio_5 = e.target.radio_5.value;
    const release_title = e.target.release_title.value;
    const subtitle = e.target.subtitle.value;
    const line_1 = e.target.line_1.value;
    const line_2 = e.target.line_2.value;
    const world = e.target.world.value;
    const upc_ean = e.target.upc_ean.value;
    const sub_genre = e.target.sub_genre.value;
    const producer_catalouge_number = e.target.producer_catalouge_number.value;
    const production_year = e.target.production_year.value;
    const label_name = e.target.label_name.value;
    const publisher = e.target.publisher.value;
    const track_language = e.target.track_language.value;
    const isrc = e.target.isrc.value;
    const tiktalk_preview = e.target.tiktalk_preview.value;

    // const data = {
    //   radio_1,
    //   radio_2,
    //   radio_3,
    //   radio_4,
    //   radio_5,
    //   selects,
    //   writers,
    //   composers,
    //   musicDirectors,
    //   producers,
    //   release_title,
    //   subtitle,
    //   line_1,
    //   line_2,
    //   world,
    //   upc_ean,
    //   sub_genre,
    //   producer_catalouge_number,
    //   production_year,
    //   label_name,
    //   publisher,
    //   track_language,
    //   isrc,
    //   tiktalk_preview,
    //   startDate
    // };
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
    // console.log(data);
    
    try {
      const response = await axios.patch(
        `${BASEURL}/user/update-music/${id}`,
        data,
        {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: localStorage.getItem("token"),
          },
        }
      );
      console.log(response.data);
      toast.success(`${response.data.message}`);
      refetch()
      if (response.data.success) {
          setLoader(false)
          window.location.reload();
          
      }
      return response.data;
    } catch (error) {
      console.log(error.response.data);
      toast.error(`${error.response.data.message}`);
      setLoader(false)
      throw new Error(error.response.data.message);
    }
  };
  const handleCreate = () => {
    setShowModal(true);
  };
  if (isLoading) {
    return <Loader></Loader>;
  }
  if (loader) {
    return <Loader></Loader>;
  }
  return (
    <form className="bg-white rounded-md p-4" onSubmit={handleSubmitUpload}>
      <h4 className="font-semibold text-xl capitalize my-3 ">
        Please provide this information
      </h4>
      <span className="text-sm text-gray-400">Add data, entire albums.</span>
      <br></br>
      <span className="text-sm text-gray-400">
        include all of the information about the tune you've chosen.
      </span>
      {/* all radio button hare  */}
      <div className="check_box_s grid grid-cols-2 gap-5 mt-3">
        <div className="flex flex-col gap-3">
          <div className="items">
            <p className="text-sm font-semibold my-1">
              Primary Track Type <span className="text-red-500">*</span>
            </p>
            <div className="flex items-center flex-wrap gap-y-0 gap-2">
              <label className="label gap-2 cursor-pointer">
                <span className="label-text">Music</span>
                <input
                  defaultChecked={"music" == albumDetails?.data?.trackType}
                  type="radio"
                  value={"music"}
                  name="radio_1"
                  className="radio radio-success radio-xs"
                />
              </label>
              <label className="label gap-2 cursor-pointer">
                <span className="label-text">Classical Music</span>
                <input
                  defaultChecked={
                    "classic-music" == albumDetails?.data?.trackType
                  }
                  type="radio"
                  name="radio_1"
                  value={"classic-music"}
                  className="radio radio-success radio-xs"
                />
              </label>
              <label className="label gap-2 cursor-pointer">
                <span className="label-text">Jazz Music</span>
                <input
                  defaultChecked={"jazz-music" == albumDetails?.data?.trackType}
                  type="radio"
                  value={"jazz-music"}
                  name="radio_1"
                  className="radio radio-success radio-xs"
                />
              </label>
            </div>
          </div>
          <div className="items">
            <p className="text-sm font-semibold my-1">
              Instrumental <span className="text-red-500">*</span>
            </p>
            <div className="flex items-center flex-wrap gap-y-0 gap-2">
              <label className="label gap-2 cursor-pointer">
                <span className="label-text">Yes</span>
                <input
                  defaultChecked={"yes" == albumDetails?.data?.instrumental}
                  type="radio"
                  value={"yes"}
                  name="radio_2"
                  className="radio radio-success radio-xs"
                />
              </label>
              <label className="label gap-2 cursor-pointer">
                <span className="label-text">NO</span>
                <input
                  defaultChecked={"no" == albumDetails?.data?.instrumental}
                  type="radio"
                  value={"no"}
                  name="radio_2"
                  className="radio radio-success radio-xs"
                />
              </label>
            </div>
          </div>
          <div className="items">
            <p className="text-sm font-semibold my-1">
              Parental advisory <span className="text-red-500">*</span>
            </p>
            <div className="flex items-center flex-wrap gap-y-0 gap-2">
              <label className="label gap-2 cursor-pointer">
                <span className="label-text">Explict</span>
                <input
                  defaultChecked={
                    "explicit" == albumDetails?.data?.parentalAdvisory
                  }
                  type="radio"
                  name="radio_3"
                  className="radio radio-success radio-xs"
                  value="explicit"
                />
              </label>
              <label className="label gap-2 cursor-pointer">
                <span className="label-text">Not Explict</span>
                <input
                  defaultChecked={
                    "no-explicit" == albumDetails?.data?.parentalAdvisory
                  }
                  type="radio"
                  name="radio_3"
                  className="radio radio-success radio-xs"
                  value="no-explicit"
                />
              </label>
              <label className="label gap-2 cursor-pointer">
                <span className="label-text">Edited</span>
                <input
                  defaultChecked={
                    "edited" == albumDetails?.data?.parentalAdvisory
                  }
                  type="radio"
                  name="radio_3"
                  className="radio radio-success radio-xs"
                  value="edited"
                />
              </label>
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-3">
          <div className="items">
            <p className="text-sm font-semibold my-1">
              Is this track consider a key track for the release
              <span className="text-red-500">*</span>
            </p>
            <div className="flex items-center flex-wrap gap-y-0 gap-2">
              <label className="label gap-2 cursor-pointer">
                <span className="label-text">Yes</span>
                <input
                  defaultChecked={"yes" == albumDetails?.data?.isRelease}
                  type="radio"
                  name="radio_4"
                  className="radio radio-success radio-xs"
                  value="yes"
                />
              </label>
              <label className="label gap-2 cursor-pointer">
                <span className="label-text">No</span>
                <input
                  defaultChecked={"no" == albumDetails?.data?.isRelease}
                  type="radio"
                  name="radio_4"
                  className="radio radio-success radio-xs"
                  value="no"
                />
              </label>
            </div>
          </div>
          <div className="items">
            <p className="text-sm font-semibold my-1">
              Secondary Track Type <span className="text-red-500">*</span>
            </p>
            <div className="flex items-center flex-wrap gap-y-0 gap-2">
              <label className="label gap-2 cursor-pointer">
                <span className="label-text">Original</span>
                <input
                  defaultChecked={
                    "original" == albumDetails?.data?.secondaryTrackType
                  }
                  type="radio"
                  name="radio_5"
                  className="radio radio-success radio-xs"
                  value="original"
                />
              </label>
              <label className="label gap-2 cursor-pointer">
                <span className="label-text">Karaoke</span>
                <input
                  defaultChecked={
                    "karaoke" == albumDetails?.data?.secondaryTrackType
                  }
                  type="radio"
                  name="radio_5"
                  className="radio radio-success radio-xs"
                  value="karaoke"
                />
              </label>
              <label className="label gap-2 cursor-pointer">
                <span className="label-text">Medly</span>
                <input
                  defaultChecked={
                    "melody" == albumDetails?.data?.secondaryTrackType
                  }
                  type="radio"
                  name="radio_5"
                  className="radio radio-success radio-xs"
                  value="melody"
                />
              </label>
              <label className="label gap-2 cursor-pointer">
                <span className="label-text">Cover</span>
                <input
                  defaultChecked={
                    "cover" == albumDetails?.data?.secondaryTrackType
                  }
                  type="radio"
                  name="radio_5"
                  className="radio radio-success radio-xs"
                  value="cover"
                />
              </label>
              <label className="label gap-2 cursor-pointer">
                <span className="label-text">Cover by cover band</span>
                <input
                  defaultChecked={
                    "cover-by-band" == albumDetails?.data?.secondaryTrackType
                  }
                  type="radio"
                  name="originals"
                  className="radio radio-success radio-xs"
                  value="cover-by-band"
                />
              </label>
            </div>
          </div>
        </div>
      </div>
      <div className="input_fild grid grid-cols-2 gap-3 mt-3">
        <div className="form-control">
          <label className="label">
            <span className="label-text font-semibold">
              Release Title <span className="text-red-500">*</span>
            </span>
          </label>
          <input
            defaultValue={albumDetails?.data?.releaseTitle}
            required
            type="text"
            name="release_title"
            className="input input-sm rounded h-9 shadow bg-[#dddddd1e]"
          />
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text font-semibold">Subtitle </span>
          </label>
          <input
            defaultValue={albumDetails?.data?.subtitle}
            required
            type="text"
            name="subtitle"
            placeholder="version/subtitle"
            className="input input-sm rounded h-9 shadow bg-[#dddddd1e]"
          />
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text font-semibold">
              C Line <span className="text-red-500">*</span>
            </span>
          </label>
          <input
            defaultValue={albumDetails?.data?.line}
            required
            type="text"
            name="line_1"
            className="input input-sm rounded h-9 shadow bg-[#dddddd1e]"
          />
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text font-semibold">
              P Line <span className="text-red-500">*</span>
            </span>
          </label>
          <input
            defaultValue={albumDetails?.data?.line}
            required
            type="text"
            placeholder="Taranga Electro Centre"
            name="line_2"
            className="input input-sm rounded h-9 shadow bg-[#dddddd1e]"
          />
        </div>
      </div>
      {/*============================Author Data section start======================= */}
      <div className="author-section-main">
        <div className="form-control  mt-3">
          <div className="flex w-full">
            {!showModal && (
              <label className="label">
                <span className="label-text font-semibold">
                  Primary Artist{" "}
                </span>
                <button
                  className="font-bold text-green-600 ml-4"
                  onClick={handleCreate}
                >
                  Create Artist
                </button>
              </label>
            )}

            {showModal && (
              <CreateArtistBox
                setShowModal={setShowModal}
                refetch={artistReFetch}
              ></CreateArtistBox>
            )}
          </div>
          <div className="grid grid-cols-2 gap-3">
            {selects.map((select, index) => (
              <div key={select.id} className="relative">
                <select
                  required
                  className="select select-sm w-full rounded h-9 shadow bg-[#dddddd1e]"
                  onChange={(event) => handleSelectChange(index, event)}
                  value={select.selectedOption}
                >
                  <option selected disabled>
                    Select primary artist
                  </option>
                  {showArtistList?.data?.map((item, nameIndex) => {
                    return (
                      <option key={nameIndex} value={item?._id}>
                        {item?.primaryArtistName}
                      </option>
                    );
                  })}
                </select>
                {index > 0 && (
                  <button
                    type="button"
                    className="absolute top-1 right-1 text-red-500 hover:text-red-700"
                    onClick={() => deleteSelect(index)}
                  >
                    X
                  </button>
                )}
              </div>
            ))}
            <div>
              <button
                type="button"
                className="add-another-btn me-5"
                onClick={addSelect}
              >
                + Add Another
              </button>
            </div>
          </div>
        </div>
        <div className="form-control mt-3">
          <label className="label">
            <span className="label-text font-semibold">
              Writer <span className="text-red-500">*</span>{" "}
            </span>
          </label>
          <div className="grid grid-cols-2 gap-3">
            {writers.map((writer, index) => (
              <div key={index} className="relative">
                <input
                  required
                  type="text"
                  value={writer.writerName}
                  onChange={(e) => handleWriterChange(index, e.target.value)}
                  className="input input-sm rounded h-9 shadow bg-[#dddddd1e] w-full"
                />
                {index > 0 && (
                  <button
                    type="button"
                    className="absolute top-1 right-1 text-red-500 hover:text-red-700"
                    onClick={() => deleteWriter(index)}
                  >
                    X
                  </button>
                )}
              </div>
            ))}
            <div>
              <button
                type="button"
                className="add-another-btn"
                onClick={addWriter}
              >
                + Add Writer
              </button>
            </div>
          </div>
        </div>
        <div className="form-control mt-3">
          <label className="label">
            <span className="label-text font-semibold">Composer </span>
          </label>
          <div className="grid grid-cols-2 gap-3">
            {composers.map((composer, index) => (
              <div key={index} className="relative">
                <input
                  required
                  type="text"
                  value={composer.composerName}
                  onChange={(e) => handleComposerChange(index, e.target.value)}
                  className="input input-sm rounded h-9 shadow bg-[#dddddd1e] w-full"
                />
                {index > 0 && (
                  <button
                    type="button"
                    className="absolute top-1 right-1 text-red-500 hover:text-red-700"
                    onClick={() => deleteComposer(index)}
                  >
                    X
                  </button>
                )}
              </div>
            ))}
            <div>
              <button
                type="button"
                className="add-another-btn"
                onClick={addComposer}
              >
                + Add Composer
              </button>
            </div>
          </div>
        </div>
        <div className="form-control mt-3">
          <label className="label">
            <span className="label-text font-semibold">
              Music Director <span className="text-red-500">*</span>{" "}
            </span>
          </label>
          <div className="grid grid-cols-2 gap-3">
            {musicDirectors.map((musicDirector, index) => (
              <div key={index} className="relative">
                <input
                  required
                  type="text"
                  value={musicDirector.musicDirectorName}
                  onChange={(e) =>
                    handleMusicDirectorChange(index, e.target.value)
                  }
                  className="input input-sm rounded h-9 shadow bg-[#dddddd1e] w-full"
                />
                {index > 0 && (
                  <button
                    type="button"
                    className="absolute top-1 right-1 text-red-500 hover:text-red-700"
                    onClick={() => deleteMusicDirector(index)}
                  >
                    X
                  </button>
                )}
              </div>
            ))}
            <div>
              <button
                type="button"
                className="add-another-btn"
                onClick={addMusicDirector}
              >
                + Add Director
              </button>
            </div>
          </div>
        </div>
        <div className="form-control mt-3">
          <label className="label">
            <span className="label-text font-semibold">
              Producer <span className="text-red-500">*</span>{" "}
            </span>
          </label>
          <div className="grid grid-cols-2 gap-3">
            {producers.map((producer, index) => (
              <div key={index} className="relative">
                <input
                  required
                  type="text"
                  value={producer.producerName}
                  onChange={(e) => handleProducerChange(index, e.target.value)}
                  className="input input-sm rounded h-9 shadow bg-[#dddddd1e] w-full"
                />
                {index > 0 && (
                  <button
                    type="button"
                    className="absolute top-1 right-1 text-red-500 hover:text-red-700"
                    onClick={() => deleteProducer(index)}
                  >
                    X
                  </button>
                )}
              </div>
            ))}
            <div>
              <button
                type="button"
                className="add-another-btn"
                onClick={addProducer}
              >
                + Add Producer
              </button>
            </div>
          </div>
        </div>
      </div>

      {/*============================Author Data section end======================= */}
      {/* buttom input here  ================*/}
      <div className="input_fild grid grid-cols-2 gap-3 mt-3">
        <div className="form-control">
          <label className="label">
            <span className="label-text font-semibold">Genre </span>
          </label>
          <select
            className="select select-sm  w-full rounded h-9 shadow bg-[#dddddd1e]"
            name="world"
          >
            <option disabled selected>
              World
            </option>
            <option value={"han solo"}>Han Solo</option>
            <option value={"greedo"}>Greedo</option>
          </select>
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text font-semibold">
              UPC/EAN (optional){" "}
            </span>
          </label>
          <input
            defaultValue={albumDetails?.data?.upcEan}
            required
            type="text"
            name="upc_ean"
            placeholder="UPC/EAN"
            className="input input-sm rounded h-9 shadow bg-[#dddddd1e]"
          />
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text font-semibold">
              SubGenre (optional){" "}
            </span>
          </label>
          <select
            className="select select-sm  w-full rounded h-9 shadow bg-[#dddddd1e]"
            name="sub_genre"
          >
            <option disabled selected>
              Select SubGenre
            </option>
            <option value={"Han Solo"}>Han Solo</option>
            <option value={"Greedo"}>Greedo</option>
          </select>
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text font-semibold">
              Producer Catalogue number (optional)
            </span>
          </label>
          <input
            defaultValue={albumDetails?.data?.producerCatalogNumber}
            required
            type="text"
            placeholder="TEEC3012"
            name="producer_catalouge_number"
            className="input input-sm rounded h-9 shadow bg-[#dddddd1e]"
          />
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text font-semibold">Production year *</span>
          </label>
          <select
            className="select select-sm  w-full rounded h-9 shadow bg-[#dddddd1e]"
            name="production_year"
          >
            <option disabled selected>
              2024
            </option>
            <option value={"2021"}>2021</option>
            <option value={"2022"}>2022</option>
            <option value={"2023"}>2023</option>
            <option value={"2024"}>2024</option>
            <option value={"2025"}>2025</option>
          </select>
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text font-semibold">Label Name *</span>
          </label>
          <select
            className="select select-sm  w-full rounded h-9 shadow bg-[#dddddd1e]"
            name="label_name"
          >
            {/* <option disabled selected>
            Select Label
          </option> */}
            {showLabelList?.data?.map((item, i) => {
              return (
                <option key={i} value={item?._id}>
                  {item?.labelName}
                </option>
              );
            })}
            {/* <option value={"Han Solo"}>Han Solo</option>
          <option value={"Greedo"}>Greedo</option> */}
          </select>
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text font-semibold">Publisher *</span>
          </label>
          <input
            defaultValue={albumDetails?.data?.publisher}
            required
            type="text"
            placeholder="TarangaEC"
            name="publisher"
            className="input input-sm rounded h-9 shadow bg-[#dddddd1e]"
          />
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text font-semibold">Track Language *</span>
          </label>
          <select
            className="select select-sm  w-full rounded h-9 shadow bg-[#dddddd1e]"
            name="track_language"
          >
            <option disabled selected>
              Bengali
            </option>
            <option value={"Han Solo"}>Han Solo</option>
            <option value={"Greedo"}>Greedo</option>
          </select>
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text font-semibold">ISRC *</span>
          </label>
          <input
            defaultValue={albumDetails?.data?.isrc}
            required
            type="text"
            placeholder="IN-S7A-RC-26-00145"
            name="isrc"
            className="input input-sm rounded h-9 shadow bg-[#dddddd1e]"
          />
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text font-semibold">
              Tiktok preview start in seconds
            </span>
          </label>
          <input
            defaultValue={albumDetails?.data?.tiktokStartInSecond}
            required
            type="text"
            placeholder="30"
            name="tiktalk_preview"
            className="input input-sm rounded h-9 shadow bg-[#dddddd1e]"
          />
        </div>
        <div className="form-control ">
          <label className="label">
            <span className=" font-semibold">Release dates</span>
          </label>
          <div className="relase_date font-semibold text-lg pl-9 text-gray-500 relative">
            <span className="absolute left-2 top-1 text-xl">
              <FaRegCalendarCheck />
            </span>
            <DatePicker
              selected={startDate}
              onChange={(date) => setStartDate(date)}
            />
          </div>
        </div>
      </div>
      <div className="button_box flex items-center justify-center p-2 mt-8">
        <div className="relative">
          <input
            // onClick={() => handleTabChange(3)}
            type="submit"
            value={"Save Now"}
            className="btn  pr-9 btn-outline btn-success flex items-center gap-1 z-20"
          ></input>
          <span className="text-xl absolute top-4 right-2 text-success z-10">
            <MdOutlineSkipNext />
          </span>
        </div>
      </div>
    </form>
  );
};

export default UploadEditDetails;
 