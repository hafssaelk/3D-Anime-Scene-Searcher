/* eslint-disable no-unused-vars */
import React from 'react';
import { useNavigate } from 'react-router-dom';
import SearchBar from '../components/SearchBar';

const Search = () => {
  const navigate = useNavigate();

  const handleSearch = async (input) => {
    let results;

    if (input instanceof File) {
      // Handle file search
      const formData = new FormData();
      formData.append('file', input);

      results = await fetch('https://api.trace.moe/search', {
        method: 'POST',
        body: formData,
      }).then(res => res.json());
    } else {
      // Handle URL search
      results = await fetch(`https://api.trace.moe/search?url=${encodeURIComponent(input)}`)
        .then(res => res.json());
    }

    // Navigate to the results page with the results
    navigate('/results', { state: { searchResults: results.result } });
  };

  return (
    <div className='flex flex-col items-center justify-center min-h-screen'>
      <h1 className='text-2xl font-bold mb-4'>Anime Finder</h1>
      <SearchBar onSearch={handleSearch} />
    </div>
  );
};

export default Search;
