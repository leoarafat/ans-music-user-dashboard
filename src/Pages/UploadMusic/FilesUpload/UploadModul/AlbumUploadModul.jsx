import { MdOutlineSkipNext } from "react-icons/md";
import { RiSkipBackMiniLine } from "react-icons/ri";
import { BsMusicNoteBeamed } from "react-icons/bs";
import { IoMdAdd } from "react-icons/io";
import { FiEdit } from "react-icons/fi";
import { LuFolderClosed } from "react-icons/lu";
import { MdOutlineDeleteSweep } from "react-icons/md";
import { FaRegEdit } from "react-icons/fa";
import { useContext, useEffect, useState, useRef } from "react";
import defaultImage from "../../../../assets/login/login.png";
import { AuthContext } from "../../../../context/AuthProvider";
import UploadForm from "../UploadForm/UploadForm";

const AlbumUploadModal = ({
  setUploadData,
  closeModal,
  successAction,
  modalData,
}) => {
  const { albumSong, setAlbumSong } = useContext(AuthContext);
  const [previewImage, setPreviewImage] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedAudio, setSelectedAudio] = useState([]);
  const idCounter = useRef(1); // Use useRef to persist the counter value across renders

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setSelectedImage(file);

    const reader = new FileReader();
    reader.onload = () => {
      setPreviewImage(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const handleAudioChange = (e) => {
    const files = e.target.files;
    const newAudioFiles = Array.from(files).map((file) => ({
      id: idCounter.current++,
      title: file.name,
      artist: "Unknown",
      audio: file,
    }));
    setSelectedAudio([...selectedAudio, ...newAudioFiles]);
  };

  const deleteAudio = (id) => {
    const updatedAudio = selectedAudio.filter((audio) => audio.id !== id);
    setSelectedAudio(updatedAudio);
  };

  const handleEditAudio = (id) => {
    const editBox = document.getElementById(`edit_box_${id}`);
    if (editBox.style.display === "block") {
      editBox.style.display = "none";
    } else {
      editBox.style.display = "block";
    }
  };

  const handleSaveAudio = (id) => {
    const title = document.getElementById(`title_${id}`).value;
    const artist = document.getElementById(`artist_${id}`).value;
    const updatedAudio = selectedAudio.map((audio) =>
      audio.id === id ? { ...audio, title, artist } : audio
    );
    setSelectedAudio(updatedAudio);
    const editBox = document.getElementById(`edit_box_${id}`);
    editBox.style.display = "none";
  };

  useEffect(() => {
    setAlbumSong({ selectedAudio, selectedImage });
  }, [selectedAudio, selectedImage]);

  return (
    <div className="">
      <input type="checkbox" id="confirmation-modal" className="modal-toggle" />
      <div className="modal ">
        <div className="modal-box bg-[#fffffff8]">
          <div className="top_title_bg p-5 text-white text-center">
            <h4 className="text-xl font-semibold uppercase">Album uploading</h4>
            <p className="text-sm">
              One by one, upload every song from the album at once. For each
              track, you should complete the required fields.
            </p>
          </div>
          <div className="main_Body p-5">
            <div className="grid grid-cols-2 items-center w-full bg-gray-100 p-4 rounded-md">
              <div className="flex flex-col gap-2 items-center">
                <h6 className="font-semibold text-xs">
                  Upload Cover Photo Sultan
                </h6>
                <div className="w-full flex items-center justify-center">
                  <input
                    type="file"
                    id="image"
                    name="image"
                    accept="image/*"
                    className="hidden input-fild w-full bg-white"
                    onChange={handleImageChange}
                  />
                  <div className="flex items-center justify-start relative flex-col gap-1 w-48 h-40 rounded-md">
                    {previewImage && (
                      <img
                        src={previewImage}
                        alt="Selected Image"
                        className="w-full h-full shadow "
                      />
                    )}
                    {previewImage ? (
                      <div
                        className="change-container rounded-full cursor-pointer flex items-center justify-center absolute top-0 left-0 w-full h-full"
                        onClick={() => document.getElementById("image").click()}
                      >
                        <span className="change-image font-bold text-3xl text-gray-200">
                          <FiEdit />
                        </span>
                      </div>
                    ) : (
                      <div className="pre_image relative">
                        <div
                          className="change-container rounded-full cursor-pointer flex items-center justify-center absolute top-0 left-0 w-full h-full"
                          onClick={() =>
                            document.getElementById("image").click()
                          }
                        >
                          <span className="change-image font-bold text-3xl text-gray-200">
                            <FiEdit />
                          </span>
                        </div>

                        <img
                          className="w-48 h-40 shadow "
                          src={defaultImage}
                          alt="profile-img"
                        />
                      </div>
                    )}
                  </div>
                </div>
              </div>

              <div className="flex items-center flex-col gap-2 w-full mt-5">
                <input
                  type="file"
                  id="fileInput"
                  style={{ display: "none" }}
                  multiple
                  onChange={handleAudioChange}
                />

                <label
                  id="upload_multiple_audio_files"
                  htmlFor="fileInput"
                  className="transition w-48 h-40 text-green-600 uppercase gap-4 cursor-pointer hover:bg-green-100 p-4 bg-white shadow-md rounded-md flex flex-col items-center justify-center"
                >
                  <span className="font-bold text-6xl">
                    <BsMusicNoteBeamed />
                  </span>
                  <p className="flex items-center gap-2">
                    <span className="text-2xl">
                      <IoMdAdd />
                    </span>
                    <span>{"ADD Track"}</span>
                  </p>
                </label>
              </div>
            </div>
            {/* Show Audios */}
            <div className="show_audios p-4 shadow-sm rounded flex flex-col gap-2 font-semibold text-md">
              {selectedAudio.map((song) => {
                return (
                  <div
                    id="single_song"
                    key={song.id}
                    className="bg-green-100 shadow-sm p-2 rounded"
                  >
                    <div className="flex items-center justify-between ">
                      <div className="left flex items-center gap-3">
                        <span className="text-xl">
                          <LuFolderClosed />
                        </span>
                        <span id={`audio_title_${song.id}`}>{song.title}</span>
                      </div>
                      <div className="right flex items-center gap-10">
                        <span
                          id={`edit_audio_${song.id}`}
                          className="text-xl cursor-pointer"
                          onClick={() => handleEditAudio(song.id)}
                        >
                          <FaRegEdit />
                        </span>
                        <span
                          id={`delete_audio_${song.id}`}
                          className="text-2xl cursor-pointer"
                          onClick={() => deleteAudio(song.id)}
                        >
                          <MdOutlineDeleteSweep />
                        </span>
                      </div>
                    </div>
                    <div
                      id={`edit_box_${song.id}`}
                      className="bg-white p-3 rounded shadow text-xs hidden"
                    >
                      <form
                        className="grid grid-cols-2 gap-2"
                        onSubmit={(e) => {
                          e.preventDefault();
                          handleSaveAudio(song.id);
                        }}
                      >
                        <div className="w-full">
                          <label className="">Title</label>
                          <input
                            type="text"
                            id={`title_${song.id}`}
                            name="title"
                            placeholder="Type here"
                            className="input input-sm input-bordered w-full"
                            defaultValue={song.title}
                          />
                        </div>
                        <div className="w-full">
                          <label className="">Artist</label>
                          <input
                            type="text"
                            id={`artist_${song.id}`}
                            name="artist"
                            placeholder="Type here"
                            className="input input-sm input-bordered w-full"
                            defaultValue={song.artist}
                          />
                        </div>
                        <div className="ll">
                          {song.audio && (
                            <audio controls>
                              <source
                                src={URL.createObjectURL(song.audio)}
                                type="audio/mp3"
                              />
                              Your browser does not support the audio element.
                            </audio>
                          )}
                        </div>
                        <div className="flex items-end justify-center">
                          <input
                            className="btn btn-sm bg-green-500 btn-success text-white"
                            type="submit"
                            value="Save"
                          />
                        </div>
                      </form>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
          {/* Action button here */}
          <div className="button_box flex items-center justify-between p-5">
            <button
              onClick={closeModal}
              type="button"
              className="btn btn-sm btn-outline btn-success flex items-center gap-1"
            >
              <span className="text-xl">
                <RiSkipBackMiniLine />
              </span>
              Back
            </button>
            <label
              onClick={() => successAction(modalData)}
              type="button"
              className="btn btn-sm btn-outline btn-success flex items-center gap-1"
            >
              Next
              <span className="text-xl">
                <MdOutlineSkipNext />
              </span>
            </label>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AlbumUploadModal;
