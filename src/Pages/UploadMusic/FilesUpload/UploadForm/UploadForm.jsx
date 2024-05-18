import { useState } from "react";

const UploadForm = () => {
  const [formData, setFormData] = useState({
    audioFiles: [],
    titles: [],
    artists: [],
  });
  // console.log(formData, "formData");

  const handleInputChange = (index, field, value) => {
    setFormData((prevData) => {
      const newData = { ...prevData };
      newData[field][index] = value;
      return newData;
    });
  };

  const handleFileChange = (index, e) => {
    const file = e.target.files[0];
    // console.log(file, "file");
    setFormData((prevData) => {
      const newData = { ...prevData };
      newData.audioFiles[index] = file || null;
      //   console.log(newData, "newData");
      return newData;
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log(formData);
    const form = new FormData();

    formData.audioFiles.forEach((file, index) => {
      form.append("audio", file);
      form.append("title", formData.titles[index]); // Append title for each file
      form.append("artist", formData.artists[index]); // Append artist for each file
    });

    // try {
    //   const response = await fetch(
    //     "http://localhost:5000/api/v1/album/multiple",
    //     {
    //       method: "POST",
    //       body: form,
    //     }
    //   );

    //   if (!response.ok) {
    //     // Handle error
    //     console.error("Upload failed:", response.statusText);
    //     return;
    //   }

    //   const result = await response.json();
    //   console.log("Upload successful:", result);
    // } catch (error) {
    //   console.error("Error during upload:", error.message);
    // }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-md mx-auto mt-8 p-4 border rounded-md"
    >
      {formData.audioFiles.map((_, index) => (
        <div key={index} className="mb-4">
          <input
            type="file"
            accept="audio/*"
            onChange={(e) => handleFileChange(index, e)}
            required
            className="mb-2"
          />
          <input
            type="text"
            placeholder="Title"
            value={formData.titles[index]}
            onChange={(e) => handleInputChange(index, "titles", e.target.value)}
            required
            className="w-full px-3 py-2 border text-black rounded-md"
          />
          <input
            type="text"
            placeholder="Artist"
            value={formData.artists[index]}
            onChange={(e) =>
              handleInputChange(index, "artists", e.target.value)
            }
            required
            className="w-full px-3 py-2 mt-2 text-black border rounded-md"
          />
        </div>
      ))}
      <button
        type="button"
        onClick={() =>
          setFormData((prevData) => ({
            ...prevData,
            audioFiles: [...prevData.audioFiles, null],
            titles: [...prevData.titles, ""],
            artists: [...prevData.artists, ""],
          }))
        }
        className="bg-blue-500 text-white px-4 py-2 rounded-md mr-2"
      >
        Add More
      </button>
      <button
        type="submit"
        className="bg-green-500 text-white px-4 py-2 rounded-md"
      >
        Upload
      </button>
    </form>
  );
};

export default UploadForm;
