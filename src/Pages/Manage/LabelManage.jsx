import React, { useState } from "react";
import { CirclesWithBar } from "react-loader-spinner";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import BASEURL from "../../../Constants";

import toast from "react-hot-toast";
const LabelManage = () => {
  const [selectedOption, setSelectedOption] = useState("all");
  const [id, setId] = useState("");
  const [title, setTitle] = useState("");
  const userId = localStorage.getItem("user_id");

  // <<<<<<<<< Profile info Data Recived >>>>>>>>>>
  const { data: showLabelList = [], refetch } = useQuery({
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
  console.log(showLabelList);
  const handleSelectChange = (event) => {
    setSelectedOption(event.target.value);
  };

  const handleSave = async () => {
    // Perform API call here with id and title data
    console.log("ID:", id);
    console.log("Title:", title);
    const data = {
      user: userId,
      labelName: title,
      // labelId: id,
    };
    try {
      const response = await axios.post(`${BASEURL}/manage/add-label`, data, {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      });
      console.log(response.data);
      toast.success(`${response.data.message}`);
      refetch()
      // Reset input fields after saving
      setId("");
      setTitle("");
      return response.data;
    } catch (error) {
      console.log(error.response.data);
      toast.error(`${error.response.data.message}`);
      throw new Error(error.response.data.message);
    }
  };

  return (
    <div className="bg-white p-5">
      <div className="w-[200px] mb-5">
        <select
          id="language"
          className="select bg-[#f7fef8] w-full"
          name="language"
          value={selectedOption}
          onChange={handleSelectChange}
        >
          <option value="all">All</option>
          <option value="newLabel">New Label</option>
          {/* <option value="approved">Approved</option>
          <option value="rejected">Rejected</option> */}
        </select>
      </div>
      <div className="grid grid-cols-3 mb-5 bg-[#f9fcfa] py-2">
        <div className="flex items-center text-color">
          <input type="checkbox" className="checkbox checkbox-width" />
          <h2>ID</h2>
        </div>
        <h2 className="text-color">Label Name</h2>
        <h2 className="text-color">Status</h2>
      </div>
      {selectedOption === "newLabel" && (
        <div className="grid grid-cols-3 gap-5">
          <input
            type="text"
            placeholder="ID"
            className="input"
            value={id}
            onChange={(e) => setId(e.target.value)}
          />
          <input
            type="text"
            placeholder="name"
            className="input"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <button className="btn" onClick={handleSave}>
            Save
          </button>
        </div>
      )}

      {(selectedOption === "approved" || selectedOption === "all") && (
        <>
         {
          showLabelList?.data?.map((item, i) => {
            return(
              <div key={i} className="manage-label-data grid grid-cols-3 mb-5">
              <div className="flex items-center">
                <input type="checkbox" className="checkbox checkbox-width" />
                <p>{item.labelId}</p>
              </div>
              <div>
                <p>{item.labelName}</p>
              </div>
              <div>
                <p>Approved</p>
              </div>
            </div>
            )
          })
         }
        </>
      )}
      {/* {(selectedOption === "rejected" || selectedOption === "all") && (
        <>
          <div className="manage-label-data grid grid-cols-3">
            <div className="flex items-center">
              <input type="checkbox" className="checkbox checkbox-width" />
              <p>2</p>
            </div>
            <div>
              <p>John Doe</p>
            </div>
            <div>
              <p>Rejected</p>
            </div>
          </div>
        </>
      )} */}
    </div>
  );
};

export default LabelManage;
