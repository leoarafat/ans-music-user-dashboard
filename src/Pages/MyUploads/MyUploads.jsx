import React, { useState, useRef, useEffect } from "react";
import image1 from "../../assets/tab-data-pic/1.png";
import {
  FaRegLightbulb,
  FaMusic,
  FaUser,
  FaEye,
  FaRegEdit,
} from "react-icons/fa";
import { RiDeleteBinLine } from "react-icons/ri";

import { BsThreeDotsVertical } from "react-icons/bs";
import { CiFilter } from "react-icons/ci";
import { Link } from "react-router-dom";

const MyUploads = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [isViewBoxOpen, setIsViewBoxOpen] = useState(false);
  const [isViewBoxOpenOne, setIsViewBoxOpenOne] = useState(false);
  const [isViewBoxOpenTow, setIsViewBoxOpenTow] = useState(false);

  const viewBoxRef = useRef(null);
  const viewBoxOneRef = useRef(null);
  const viewBoxTowRef = useRef(null);

  const handleClickOutside = (event) => {
    if (viewBoxRef.current && !viewBoxRef.current.contains(event.target)) {
      setIsViewBoxOpen(false);
    }
    if (
      viewBoxOneRef.current &&
      !viewBoxOneRef.current.contains(event.target)
    ) {
      setIsViewBoxOpenOne(false);
    }
    if (
      viewBoxTowRef.current &&
      !viewBoxTowRef.current.contains(event.target)
    ) {
      setIsViewBoxOpenTow(false);
    }
  };

  const handleTabClick = (index) => {
    setActiveTab(index);
  };

  const handleViewBoxToggle = () => {
    setIsViewBoxOpen(!isViewBoxOpen);
    setIsViewBoxOpenOne(false); // Close other boxes
    setIsViewBoxOpenTow(false); // Close other boxes
  };
  const handleViewBoxOneToggle = () => {
    setIsViewBoxOpenOne(!isViewBoxOpenOne);
    setIsViewBoxOpen(false); // Close other boxes
    setIsViewBoxOpenTow(false); // Close other boxes
  };
  const handleViewBoxTowToggle = () => {
    setIsViewBoxOpenTow(!isViewBoxOpenTow);
    setIsViewBoxOpen(false); // Close other boxes
    setIsViewBoxOpenOne(false); // Close other boxes
  };

  useEffect(() => {
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  const tabs = [
    { icon: <FaRegLightbulb />, label: "Successful Release" },
    { icon: <FaMusic />, label: "Release to finalize music" },
    { icon: <FaUser />, label: "Release Correction" },
  ];

  return (
    <div className=" main_container mt-2 ">
      <div className="bg-white pt-2 rounded-md px-5">
        <div className="flex items-centr">
          <h1 className="my-uploading-heading w-1/2 ">My Uploading</h1>
          <div className="flex items-center w-1/2 justify-end">
            <h2 className="me-5">
              <span className="album-data-heading">Showing:</span>{" "}
              <span className="album-data-value"> 60 filtered album</span>
            </h2>
            <p className="flex items-center filter-box cursor-pointer">
              <CiFilter />
              <span>Filter</span>
            </p>
          </div>
        </div>
        <div className="navbar  p-0 min-h-0">
          <ul className="cursor-pointer">
            {tabs.map((tab, index) => (
              <li
                key={index}
                className={`list-item ${index === activeTab ? "active" : ""}`}
                onClick={() => handleTabClick(index)}
              >
                <Link className="flex items-center ">
                  <span className="pe-3">{tab.icon}</span>
                  <span>{tab.label}</span>
                </Link>
              </li>
            ))}
          </ul>

          {/* Content for the selected tab */}
        </div>
      </div>
      <div className="tab-margin-top">
        {/* You can render different content based on the activeTab value */}
        {activeTab === 0 && (
          <>
            <div className="flex flex-col gap-2 ">
              <div className="grid grid-cols-7 gap-5 tab-data">
                <div className="w-[141px] h-[118px]">
                  <img
                    className="w-[141px] h-[118px]"
                    src={image1}
                    alt="Logo"
                  />
                </div>
                <div className="py-3">
                  <h2 className="album-name">Album Name</h2>
                  <p className="value-color-data">jeancolc lasa</p>
                </div>
                <div className="py-3">
                  <h2 className="album-data-heading">Created by</h2>
                  <p className="album-data-value">Ashfaqur Rahman</p>
                </div>
                <div className="py-3">
                  <h2 className="album-data-heading">Label</h2>
                  <p className="album-data-value">
                    Taranga Electro center Jun 24,2024
                  </p>
                </div>
                <div className="py-3">
                  <h2 className="album-data-heading">Catalog number </h2>
                  <p className="album-data-value ">
                    <span>Cat# :TEC3001 744662925003 Release </span>
                    <span>Id:416651</span>
                  </p>
                </div>
                <div className="py-3">
                  <h2 className="album-data-heading">Stores</h2>
                  <p className="album-data-value flex items-center">
                    <FaMusic /> <span className="ms-5">220 terrs</span>
                  </p>
                  <p className="album-data-value flex items-center">
                    <FaMusic /> <span className="ms-5">21 Stored</span>
                  </p>
                </div>
                <div
                  className="py-3 flex justify-end items-center me-5 relative"
                  ref={viewBoxRef}
                >
                  <BsThreeDotsVertical
                    onClick={handleViewBoxToggle}
                    className="cursor-pointer"
                  />
                  {isViewBoxOpen && (
                    <div className="view-box">
                      <div className="box"></div>
                      <div className="flex items-center">
                        <FaEye className="me-5" />
                        <span>View</span>
                      </div>
                    </div>
                  )}
                </div>
              </div>
              <div className="grid grid-cols-7 gap-5 tab-data">
                <div className="w-[141px] h-[118px]">
                  <img
                    className="w-[141px] h-[118px]"
                    src={image1}
                    alt="Logo"
                  />
                </div>
                <div className="py-3">
                  <h2 className="album-name">Album Name</h2>
                  <p className="value-color-data">jeancolc lasa</p>
                </div>
                <div className="py-3">
                  <h2 className="album-data-heading">Created by</h2>
                  <p className="album-data-value">Ashfaqur Rahman</p>
                </div>
                <div className="py-3">
                  <h2 className="album-data-heading">Label</h2>
                  <p className="album-data-value">
                    Taranga Electro center Jun 24,2024
                  </p>
                </div>
                <div className="py-3">
                  <h2 className="album-data-heading">Catalog number </h2>
                  <p className="album-data-value ">
                    <span>Cat# :TEC3001 744662925003 Release </span>
                    <span>Id:416651</span>
                  </p>
                </div>
                <div className="py-3">
                  <h2 className="album-data-heading">Stores</h2>
                  <p className="album-data-value flex items-center">
                    <FaMusic /> <span className="ms-5">220 terrs</span>
                  </p>
                  <p className="album-data-value flex items-center">
                    <FaMusic /> <span className="ms-5">21 Stored</span>
                  </p>
                </div>
                <div
                  className="py-3 flex justify-end items-center me-5 relative"
                  ref={viewBoxRef}
                >
                  <BsThreeDotsVertical
                    onClick={handleViewBoxToggle}
                    className="cursor-pointer"
                  />
                  {isViewBoxOpen && (
                    <div className="view-box">
                      <div className="box"></div>
                      <div className="flex items-center">
                        <FaEye className="me-5" />
                        <span>View</span>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
            <div className="flex justify-between items-center mt-10">
              <div className="flex items-center">
                <h3 className="me-5  font-semibold">Show Rows:</h3>
                <div>
                  <select className="select select-bordered w-full max-w-xs album-data-heading">
                    <option selected>10 Items</option>
                    <option>20 Items</option>
                    <option>30 Items</option>
                  </select>
                </div>
              </div>
              <div>
                <div className="join">
                  <button className="join-item btn btn-active">1</button>
                  <button className="join-item btn ">2</button>
                  <button className="join-item btn">3</button>
                  <button className="join-item btn">4</button>
                </div>
              </div>
            </div>
          </>
        )}
        {activeTab === 1 && (
          <>
            <div className="grid grid-cols-7 gap-5 tab-data">
              <div className="w-[141px] h-[118px]">
                <img className="w-[141px] h-[118px]" src={image1} alt="Logo" />
              </div>
              <div className="py-3">
                <h2 className="album-name">Album Name</h2>
                <p className="value-color-data">jeancolc lasa</p>
              </div>
              <div className="py-3">
                <h2 className="album-data-heading">Created by</h2>
                <p className="album-data-value">Ashfaqur Rahman</p>
              </div>
              <div className="py-3">
                <h2 className="album-data-heading">Label</h2>
                <p className="album-data-value">
                  Taranga Electro center Jun 24,2024
                </p>
              </div>
              <div className="py-3">
                <h2 className="album-data-heading">Catalog number </h2>
                <p className="album-data-value ">
                  <span>Cat# :TEC3001 744662925003 Release </span>
                  <span>Id:416651</span>
                </p>
              </div>
              <div className="py-3">
                <h2 className="album-data-heading">Stores</h2>
                <p className="album-data-value flex items-center">
                  <FaMusic /> <span className="ms-5">220 terrs</span>
                </p>
                <p className="album-data-value flex items-center">
                  <FaMusic /> <span className="ms-5">21 Stored</span>
                </p>
              </div>
              <div
                className="py-3 flex justify-end items-center me-5 relative"
                ref={viewBoxOneRef}
              >
                <BsThreeDotsVertical
                  onClick={handleViewBoxOneToggle}
                  className="cursor-pointer"
                />
                {isViewBoxOpenOne && (
                  <div className="view-box-1">
                    <div className="box"></div>
                    <div className="flex flex-col">
                      <div className="flex items-center">
                        <FaRegEdit className="me-5" />
                        <span>Edit</span>
                      </div>
                      <div className="flex items-center">
                        <FaEye className="me-5" />
                        <span>View</span>
                      </div>
                      <div className="flex items-center">
                        <RiDeleteBinLine className="me-5" />
                        <span>Delete</span>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
            <div className="flex justify-between items-center mt-10">
              <div className="flex items-center">
                <h3 className="me-5  font-semibold">Show Rows:</h3>
                <div>
                  <select className="select select-bordered w-full max-w-xs album-data-heading">
                    <option selected>10 Items</option>
                    <option>20 Items</option>
                    <option>30 Items</option>
                  </select>
                </div>
              </div>
              <div>
                <div className="join">
                  <button className="join-item btn btn-active">1</button>
                  <button className="join-item btn ">2</button>
                  <button className="join-item btn">3</button>
                  <button className="join-item btn">4</button>
                </div>
              </div>
            </div>
          </>
        )}
        {activeTab === 2 && (
          <>
            <div className="grid grid-cols-7 gap-5 tab-data">
              <div className="w-[141px] h-[118px]">
                <img className="w-[141px] h-[118px]" src={image1} alt="Logo" />
              </div>
              <div className="py-3">
                <h2 className="album-name">Album Name</h2>
                <p className="value-color-data">jeancolc lasa</p>
              </div>
              <div className="py-3">
                <h2 className="album-data-heading">Created by</h2>
                <p className="album-data-value">Ashfaqur Rahman</p>
              </div>
              <div className="py-3">
                <h2 className="album-data-heading">Label</h2>
                <p className="album-data-value">
                  Taranga Electro center Jun 24,2024
                </p>
              </div>
              <div className="py-3">
                <h2 className="album-data-heading">Catalog number </h2>
                <p className="album-data-value ">
                  <span>Cat# :TEC3001 744662925003 Release </span>
                  <span>Id:416651</span>
                </p>
              </div>
              <div className="py-3">
                <h2 className="album-data-heading">Stores</h2>
                <p className="album-data-value flex items-center">
                  <FaMusic /> <span className="ms-5">220 terrs</span>
                </p>
                <p className="album-data-value flex items-center">
                  <FaMusic /> <span className="ms-5">21 Stored</span>
                </p>
              </div>
              <div
                className="py-3 flex justify-end items-center me-5 relative"
                ref={viewBoxTowRef}
              >
                <BsThreeDotsVertical
                  onClick={handleViewBoxTowToggle}
                  className="cursor-pointer"
                />
                {isViewBoxOpenTow && (
                  <div className="view-box-2">
                    <div className="box"></div>
                    <div className="flex  flex-col">
                      <div className="flex items-center">
                        <FaRegEdit className="me-5" />
                        <span>Edit</span>
                      </div>
                      <div className="flex items-center">
                        <FaEye className="me-5" />
                        <span>View</span>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
            <div className="flex justify-between items-center mt-10">
              <div className="flex items-center">
                <h3 className="me-5  font-semibold">Show Rows:</h3>
                <div>
                  <select className="select select-bordered w-full max-w-xs album-data-heading">
                    <option selected>10 Items</option>
                    <option>20 Items</option>
                    <option>30 Items</option>
                  </select>
                </div>
              </div>
              <div>
                <div className="join">
                  <button className="join-item btn btn-active">1</button>
                  <button className="join-item btn ">2</button>
                  <button className="join-item btn">3</button>
                  <button className="join-item btn">4</button>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default MyUploads;
