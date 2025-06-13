/* import React from 'react'

const Search = () => {
  return (
    <div>Search</div>
  )
}
*/

// src/components/Search.jsx
import React from 'react';

const Search = ({ searchTerm, setSearchTerm }) => {
  return <div>Search: {searchTerm}</div>;
};

export default Search; 

