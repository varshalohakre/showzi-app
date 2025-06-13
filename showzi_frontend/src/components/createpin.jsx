/* import React from 'react'

const CreatePin = () => {
  return (
    <div>CreatePin</div>
  )
}

export default CreatePin */



// src/components/CreatePin.jsx
import React from 'react';

const CreatePin = ({ user }) => {
  return <div>Create Pin - {user?.name}</div>;
};

export default CreatePin; // ✅ must be default export

