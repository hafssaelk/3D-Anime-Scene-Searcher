/* eslint-disable no-unused-vars */
// src/components/SearchBar.jsx
import React, { useState } from "react";
import "../components/SearchBar.css";
import PropTypes from 'prop-types';

const SearchBar = ({ onSearch }) => {
  const [inputValue, setInputValue] = useState("");
  const [imageFile, setImageFile] = useState(null);

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      setInputValue(""); // Clear the input field when a file is selected
      onSearch(file); // Trigger the search with the file directly
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (imageFile) {
      onSearch(imageFile); // Handle file search directly
    } else {
      onSearch(inputValue); // Handle URL search
    }
  };

  return (
    <div className="search-bar-container">
      <form onSubmit={handleSubmit} className="search-form">
        <div style={{ position: "relative" }}>
          <input
            type="text"
            placeholder="Enter image URL"
            value={inputValue}
            onChange={handleInputChange}
            className="search-input"
            disabled={!!imageFile}
          />
          <label htmlFor="file-upload" className="search-icon">
            📁
          </label>
          <input
            id="file-upload"
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="file-input"
          />
        </div>
        <button type="submit" className="invisible-button" aria-label="Search">
          Search
        </button>
      </form>
    </div>
  );
};
SearchBar.propTypes = {
  onSearch: PropTypes.func.isRequired, // Validate onSearch as a required function
};


export default SearchBar;
