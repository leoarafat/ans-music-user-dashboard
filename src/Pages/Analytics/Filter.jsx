import React, { useState } from "react";
import { CiFilter } from "react-icons/ci";

const Filter = () => {
  const [selectedYear, setSelectedYear] = useState("All Year");
  const [selectedMonth, setSelectedMonth] = useState("All Month");
  const [selectedLabel, setSelectedLabel] = useState("All Label");
  const [selectedType, setSelectedType] = useState("Select Type");

  const handleFilter = () => {
    // Make API call here using the selected filter values
    console.log("Selected Year:", selectedYear);
    console.log("Selected Month:", selectedMonth);
    console.log("Selected Label:", selectedLabel);
    console.log("Selected Type:", selectedType);
    // Replace console.log with actual API call
  };

  const years = ["2020", "2021", "2022", "2023", "2024"];
  const months = [
    "All Month",
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const customLabels = [
    { label: "All Label" },
    { label: "Label 1" },
    { label: "Label 2" },
    { label: "Label 3" },
    // Add more objects as needed
  ];

  return (
    <div>
      <div className="grid grid-cols-6 bg-white py-5 mt-5 rounded items-center">
        <div className="flex items-center justify-center">
          <select
            value={selectedYear}
            onChange={(e) => setSelectedYear(e.target.value)}
            className="block appearance-none w-1/2 bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
          >
            <option>All Year</option>
            {years.map((year) => (
              <option key={year} value={year}>
                {year}
              </option>
            ))}
          </select>
        </div>
        <div className="flex items-center justify-center">
          <select
            value={selectedMonth}
            onChange={(e) => setSelectedMonth(e.target.value)}
            className="block appearance-none w-1/2 bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
          >
            {months.map((month, index) => (
              <option key={index} value={month}>
                {month}
              </option>
            ))}
          </select>
        </div>
        <div className="flex flex-col items-center justify-center">
          <select
            value={selectedLabel}
            onChange={(e) => setSelectedLabel(e.target.value)}
            className="block appearance-none w-1/2 bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
          >
            {customLabels.map((item, index) => (
              <option key={index} value={item.label}>
                {item.label}
              </option>
            ))}
          </select>
        </div>
        <div className="flex flex-col items-center justify-center">
          <select
            value={selectedType}
            onChange={(e) => setSelectedType(e.target.value)}
            className="block appearance-none w-1/2 bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
          >
            <option>Select Type</option>
            <option value="audio">Audio</option>
            <option value="video">Video</option>
          </select>
        </div>
        <div className="flex items-center justify-center">
          <CiFilter />
          <div className="ms-5">|</div>
        </div>
        <div>
          <button className="filter-btn" onClick={handleFilter}>
            Filter
          </button>
        </div>
      </div>
    </div>
  );
};

export default Filter;
