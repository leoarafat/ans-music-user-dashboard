import { MdOutlineSkipNext } from "react-icons/md";
import { RiSkipBackMiniLine } from "react-icons/ri";
import { BsMusicNoteBeamed } from "react-icons/bs";
import { IoMdAdd } from "react-icons/io";
import { FiEdit } from "react-icons/fi";
import { useEffect, useState } from "react";
import defaultImage from "../../../../assets/login/login.png";
import UploadForm from "../UploadForm/UploadForm";
import { FaEdit, FaTrash } from "react-icons/fa";
const AlbumUploadModal = ({
  setUploadData,
  closeModal,
  successAction,
  modalData,
}) => {
  const [previewImage, setPreviewImage] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [editingTrackIndex, setEditingTrackIndex] = useState(null);
  const [editedTrackName, setEditedTrackName] = useState("");
  const [coverPhoto, setCoverPhoto] = useState(null);
  const [tracks, setTracks] = useState([]);

  // const handleFileChange = (event) => {
  //   const file = event.target.files[0];
  //   setSelectedFile(file);
  // };

  // const handleLabelClick = () => {
  //   // Trigger the file input click
  //   document.getElementById("fileInput").click();
  // };

  // const handleImageChange = (e) => {
  //   const file = e.target.files[0];
  //   setSelectedImage(file);

  //   const reader = new FileReader();
  //   reader.onload = () => {
  //     setPreviewImage(reader.result);
  //   };
  //   reader.readAsDataURL(file);
  // };

  const value = {
    selectedFile,
    selectedImage,
  };
  useEffect(() => {
    setUploadData(value);
  }, [selectedFile, selectedImage]);
  // console.log(value);

  const handleCoverPhotoUpload = (event) => {
    // Handle cover photo upload logic here
    const file = event.target.files[0];
    setCoverPhoto(URL.createObjectURL(file));
  };

  const handleRemoveCoverPhoto = () => {
    setCoverPhoto(null);
  };

  const handleTrackUpload = (event) => {
    const files = event.target.files;
    const newTracks = Array.from(files).map((file) => ({
      name: file.name,
      url: URL.createObjectURL(file),
    }));
    setTracks([...tracks, ...newTracks]);
  };

  const handleEditTrack = (index) => {
    setEditingTrackIndex(index);
    setEditedTrackName(tracks[index].name);
  };

  const handleSaveEdit = () => {
    const updatedTracks = [...tracks];
    updatedTracks[editingTrackIndex].name = editedTrackName;
    setTracks(updatedTracks);
    setEditingTrackIndex(null);
  };

  const handleDeleteTrack = (index) => {
    const updatedTracks = [...tracks];
    updatedTracks.splice(index, 1);
    setTracks(updatedTracks);
  };

  // console.log(tracks);

  return (
    <div className="">
      <input type="checkbox" id="confirmation-modal" className="modal-toggle" />
      <div className="modal ">
        <div className="modal-box  bg-[#fffffff8]">
          <div className="top_title_bg p-5 text-white text-center">
            <h4 className="text-xl font-semibold uppercase">Album uploading</h4>
            <p className="text-sm">
              One by one, upload every song from the album at once. For each
              track, you should complete the required fields.
            </p>
          </div>
          <div className="main_Body p-5">
            <h6 className="font-bold">Added Track</h6>
            <div className="album-upload-main">
              <h6 className="font-bold">Upload Cover Photo</h6>
              <p className="jpg-should">(JPG should be 1920 by 1080px)</p>
              <div className="grid grid-cols-2 gap-3">
                {coverPhoto ? (
                  <div className="uploaded-cover-photo">
                    <img src={coverPhoto} alt="Cover" className="mt-3 w-full" />
                    <button onClick={handleRemoveCoverPhoto}>
                      Change Image
                    </button>
                  </div>
                ) : (
                  <div className="upload-cover-photo">
                    <h1>Upload Image</h1>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleCoverPhotoUpload}
                    />
                  </div>
                )}
                <div className="upload-album-track">
                  <h1>Upload track</h1>
                  <input
                    type="file"
                    accept="audio/*"
                    multiple
                    onChange={handleTrackUpload}
                  />
                </div>
              </div>
              <div className="">
                {tracks.map((track, index) => (
                  <div
                    key={index}
                    className=" grid grid-cols-3 gap-3 mt-5 track-list track-item"
                  >
                    {editingTrackIndex === index ? (
                      <div>
                        <input
                          type="text"
                          value={editedTrackName}
                          onChange={(e) => setEditedTrackName(e.target.value)}
                        />
                        <button onClick={handleSaveEdit}>Save</button>
                      </div>
                    ) : (
                      <>
                        <p>{track.name}</p>
                        <FaEdit
                          className="edit-icon"
                          onClick={() => handleEditTrack(index)}
                        />
                        {/* <FaTrash className="delete-icon" /> */}
                        <FaTrash
                          className="delete-icon"
                          onClick={() => handleDeleteTrack(index)}
                        />
                      </>
                    )}
                  </div>
                ))}
              </div>
            </div>

            <UploadForm></UploadForm>
          </div>
          {/* Action button here ======================================== */}
          <div className="button_box  flex items-center justify-between p-5">
            <button
              onClick={closeModal}
              type="button"
              className="btn btn-sm btn-outline btn-success flex items-center gap-1"
            >
              {" "}
              <span className="text-xl">
                <RiSkipBackMiniLine />{" "}
              </span>
              Back
            </button>
            <label
              //   htmlFor="confirmation-modal"
              onClick={() => successAction(modalData)}
              type="button"
              className="btn btn-sm btn-outline btn-success flex items-center gap-1"
            >
              Next{" "}
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
