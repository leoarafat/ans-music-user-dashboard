import { useContext, useState } from "react";
import { BsMusicNoteBeamed } from "react-icons/bs";
import { IoMdAdd } from "react-icons/io";
import { MdOutlineSkipNext } from "react-icons/md";
import { RiSkipBackMiniLine } from "react-icons/ri";
import SingleUploadModal from "./UploadModul/SingleUploadModul";
import AlbumUploadModal from "./UploadModul/AlbumUploadModul";
import { AuthContext } from "../../../context/AuthProvider";
import toast from "react-hot-toast";
const FilesUpload = ({ handleTabChange }) => {
  const [uploadSingle, setUploadSingle] = useState(null);
  const [uploadAlbum, setUploadAlbum] = useState(null);
  // const [uploadData, setUploadData] = useState({});
  const { uploadData, setUploadData, albumSong, setAlbumSong } = useContext(AuthContext);
  // For Single Upload =======================
  const handleUploadFiles = () => {
    if (!uploadData?.selectedImage || !uploadData?.selectedFile) {
      toast.error("Select Image and Audio");
      return;
    }
    setUploadSingle(null);
    handleTabChange(2);
  };
  // For Album Upload =======================
  const handleUploadFilesAlbum = () => {
    console.log("Uploaded:", albumSong);
    if (!albumSong?.selectedImage || !albumSong?.selectedAudio.length > 0) {
      toast.error("Select cover image and min 1 song");
      return;
    }
    setUploadAlbum(null);
    handleTabChange(2);
  };
  const cencelModal = () => {
    setUploadSingle(null);
    setUploadAlbum(null);
  };
  
  // console.log(albumSong);
  return (
    <div className="md:py-10 bg-white rounded-md p-4">
      <h4 className="font-semibold text-xl  my-3">Select uploading system</h4>
      <span className="text-sm text-gray-400">Add singles, entire albums.</span>
      <br></br>
      <span className="text-sm text-gray-400">
        It's also recommended to select and submit a cover for your publication.
      </span>
      <div className="grid grid-cols-2 gap-5 w-3/4 mx-auto my-12">
        {/* Single Upload Button here ============= */}
        {/* <label onClick={() => setUploadSingle(sliderInfo)} htmlFor="confirmation-modal" className='btn btn-outline btn-error w-full btn-sm'>Remove</label> */}
        <label
          onClick={() => setUploadSingle("open")}
          htmlFor="confirmation-modal"
          className="card transition md:pt-7 cursor-pointer hover:bg-green-100 p-4 bg-white shadow-md rounded-md flex flex-col items-center justify-center"
        >
          <span className="font-bold text-5xl text-green-600">
            <BsMusicNoteBeamed />
          </span>
          <p className="flex my-3 items-center gap-4 font-semibold text-md">
            <span className="text-2xl">
              <IoMdAdd />
            </span>
            <span>Upload Single </span>
          </p>
        </label>
        {/* Album Upload Button here ============= */}
        <label
          onClick={() => setUploadAlbum("open")}
          htmlFor="confirmation-modal"
          className="card transition md:pt-7 cursor-pointer hover:bg-green-100 p-4 bg-white shadow-md rounded-md flex flex-col items-center justify-center"
        >
          <span className="font-bold text-5xl text-green-600">
            <BsMusicNoteBeamed />
          </span>
          <p className="flex my-3 items-center gap-4 font-semibold text-md">
            <span className="text-2xl">
              <IoMdAdd />
            </span>
            <span>Upload Album </span>
          </p>
        </label>
      </div>
      <div className="button_box flex items-center justify-between p-2 mt-8">
        <button
          onClick={() => handleTabChange(1)}
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
          onClick={() => {
            if (!uploadData?.selectedImage || !uploadData?.selectedFile) {
              toast.error("Select uploading system");
              return;
            }
            handleTabChange(2);
          }}
          type="button"
          className="btn btn-sm btn-outline btn-success flex items-center gap-1"
        >
          Next{" "}
          <span className="text-xl">
            <MdOutlineSkipNext />
          </span>
        </button>
      </div>
      {uploadSingle && (
        <SingleUploadModal
          closeModal={cencelModal}
          setUploadData={setUploadData}
          successAction={handleUploadFiles}
        ></SingleUploadModal>
      )}
      {uploadAlbum && (
        <AlbumUploadModal
          closeModal={cencelModal}
          setUploadData={setUploadData}
          successAction={handleUploadFilesAlbum}
        ></AlbumUploadModal>
      )}
    </div>
  );
};

export default FilesUpload;
