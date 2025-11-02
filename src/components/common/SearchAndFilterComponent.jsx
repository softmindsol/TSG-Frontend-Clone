import React, { useState } from "react";
import { FaFilter } from "react-icons/fa";
import { MdKeyboardArrowDown } from "react-icons/md";
import { FiSearch } from "react-icons/fi";

const SearchAndFilterComponent = ({
  filters,
  selectedFilters,
  onFilterChange,
  onSearchChange,
}) => {
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [searchText, setSearchText] = useState("");

  // Toggle filter dropdown
  const toggleFilter = () => {
    setIsFilterOpen((prev) => !prev);
  };

  // Handle filter changes
  const handleFilterChange = (value) => {
    const newFilters = selectedFilters.includes(value)
      ? selectedFilters.filter((v) => v !== value)
      : [...selectedFilters, value];
    onFilterChange(newFilters); // Update parent with new selected filters
  };

  // Handle search text changes
  const handleSearchChange = (e) => {
    setSearchText(e.target.value);
    onSearchChange(e.target.value); // Pass the search text to parent for filtering
  };

  return (
    <div className="bg-white border border-gray-200 rounded-xl p-3 lg:p-6 relative w-full h-auto flex flex-wrap items-center justify-between gap-2">
      {/* Search Input */}
      <div className="relative w-full max-w-md">
        <FiSearch className="absolute top-1/2 left-3 transform -translate-y-1/2 text-gray-400" />
        <input
          type="text"
          placeholder="Search by name or client code..."
          className="pl-10 pr-4 py-2 border border-gray-200 rounded-lg w-full h-[41px] focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={searchText}
          onChange={handleSearchChange}
        />
      </div>

      {/* Filters Dropdown */}
      <div className="relative">
        <button
          onClick={toggleFilter}
          className="flex items-center space-x-2 px-3 py-2 border border-gray-200 rounded-lg w-[115px] h-[41px]"
        >
          <FaFilter className="text-gray-800" />
          <span>Filters</span>
          <MdKeyboardArrowDown
            className={`transition-transform duration-200 ${isFilterOpen ? "rotate-180" : ""}`}
          />
        </button>

        {isFilterOpen && (
          <div className="absolute top-full right-0 mt-2 w-[223px] bg-white border border-gray-200 rounded-lg shadow-lg z-10">
            <ul className="py-2">
              {filters.map((filter) => (
                <li
                  key={filter.value}
                  className="px-4 py-2 hover:bg-gray-100 cursor-pointer flex items-center"
                  onClick={() => handleFilterChange(filter.value)}
                >
                  <input
                    type="checkbox"
                    checked={selectedFilters.includes(filter.value)}
                    readOnly
                    className="mr-3 h-4 w-4 rounded border-gray-300 text-indigo-600 accent-dark"
                  />
                  <span>{filter.label}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchAndFilterComponent;
