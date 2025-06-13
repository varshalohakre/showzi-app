/* import React from 'react'

const Search = () => {
  return (
    <div>Search</div>
  )
}

export default Search */
// ✅ GOOD - Search.jsx
// src/components/Search.jsx
import React from 'react';

const Search = ({ searchTerm, setSearchTerm }) => {
  return <div>Search: {searchTerm}</div>;
};

export default Search; // ✅

