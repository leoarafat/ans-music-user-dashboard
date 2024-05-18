import React, { useState } from "react";
import logo from "../../assets/logo/logo-main.png";

const EditDetails = ({profileData}) => {
  const [formData, setFormData] = useState({
    genre: "",
    subgenre: "",
    line1: "",
    line2: "",
    language: "",
    publisher: "",
    producer: "",
    producerCatalogNumber: { part1: "", part2: "" },
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Send formData to your API using fetch or any other HTTP library
    fetch("your_api_endpoint", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((response) => {
        if (response.ok) {
          // Handle success
          console.log("Data sent successfully");
        } else {
          // Handle errors
          console.error("Failed to send data");
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  return (
    <div className="bg-white p-5 m-5 grid grid-cols-1 gap-5">
      <div className="profile-form w-full ">
        <form className="grid grid-cols-2 gap-5" onSubmit={handleSubmit}>
          <div className="w-full">
            <label className="me-5" htmlFor="your_select">
              Genre*
            </label>
            <select
              id="your_select"
              className="select bg-[#f7fef8] w-full"
              name="genre"
              onChange={handleChange}
            >
              <option value="option1">Option 1</option>
              <option value="option2">Option 2</option>
              <option value="option3">Option 3</option>
              <option value="option4">Option 4</option>
            </select>
          </div>
          <div className="w-full">
            <label className="me-5" htmlFor="your_select">
              Subgenre*
            </label>
            <select
              id="your_select"
              className="select bg-[#f7fef8] w-full"
              name="subgenre"
              onChange={handleChange}
            >
              <option value="option1">Option 1</option>
              <option value="option2">Option 2</option>
              <option value="option3">Option 3</option>
              <option value="option4">Option 4</option>
            </select>
          </div>

          <div className="w-full">
            <label className="me-5" htmlFor="line1">
              Line 1*
            </label>
            <input
              type="text"
              placeholder="Type here"
              className="input input-bordered w-full"
              name="line1"
              onChange={handleChange}
            />
          </div>

          <div className="w-full">
            <label className="me-5" htmlFor="line2">
              Line 2*
            </label>
            <input
              type="text"
              placeholder="Type here"
              className="input input-bordered w-full"
              name="line2"
              onChange={handleChange}
            />
          </div>

          <div className="w-full">
            <label className="me-5" htmlFor="language">
              Language*
            </label>
            <select
              id="language"
              className="select bg-[#f7fef8] w-full"
              name="language"
              onChange={handleChange}
            >
              <option value="option1">Option 1</option>
              <option value="option2">Option 2</option>
              <option value="option3">Option 3</option>
              <option value="option4">Option 4</option>
            </select>
          </div>

          <div className="w-full">
            <label className="me-5" htmlFor="publisher">
              Publisher*
            </label>
            <input
              type="text"
              placeholder="Type here"
              className="input input-bordered w-full"
              name="publisher"
              onChange={handleChange}
            />
          </div>

          <div className="w-full">
            <label className="me-5" htmlFor="producer">
              Producer*
            </label>
            <input
              type="text"
              placeholder="Type here"
              className="input input-bordered w-full"
              name="producer"
              onChange={handleChange}
            />
          </div>

          <div className="w-full">
            <label className="me-5" htmlFor="producerCatalogNumber">
              Producer Catalog Number*
            </label>
            <div className="flex justify-between">
              <input
                type="text"
                placeholder="TEC"
                className="input input-bordered mr-2"
                id="part1"
                name="producerCatalogNumber.part1"
                onChange={handleChange}
              />
              <input
                type="text"
                placeholder="3000"
                className="input input-bordered"
                id="part2"
                name="producerCatalogNumber.part2"
                onChange={handleChange}
              />
            </div>
          </div>

          <button type="submit" className="profile-save-btn">
            Save
          </button>
          <button type="button" className="profile-save-btn">
            Cancel
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditDetails;
