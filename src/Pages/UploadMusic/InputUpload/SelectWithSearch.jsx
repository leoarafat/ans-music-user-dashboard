import React, { useState, useEffect } from "react";

const SelectWithSearch = ({ select, options, onSelect }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  const handleSelect = (value) => {
    setSearchTerm("");
    onSelect(value);
    setIsOpen(false);
  };

  const filteredOptions = options.filter((option) =>
    option.primaryArtistName.toLowerCase().includes(searchTerm.toLowerCase())
  );
  // console.log(options.length);
  return (
    <div className="relative">
      {select.selectedOption ? (
        <div>
          <p>{select.selectedOption}</p>
          {/* <span>X</span> */}
        </div>
      ) : (
        <input
          type="text"
          placeholder="Search artist..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onFocus={() => setIsOpen(true)}
          className="border rounded h-9 px-2 w-full"
        />
      )}
      {isOpen && (
        <ul className="absolute z-10 w-full bg-white border border-gray-300 rounded shadow mt-1 overflow-auto max-h-40">
          {filteredOptions.map((option) => (
            <li
              key={option._id}
              className="px-3 py-2 cursor-pointer hover:bg-gray-100"
              onClick={() => handleSelect(option._id)}
            >
              {option.primaryArtistName}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
export default SelectWithSearch;
