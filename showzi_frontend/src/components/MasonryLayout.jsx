import React from 'react';
import Masonry from 'react-masonry-css';
import Pin from './Pin';

const breakpointObj = {
  default: 4,
  3000: 6,
  2000: 5,
  1200: 3,
  1000: 2,
  500: 1,
};

const MasonryLayout = ({ pins }) => {
  console.log('MasonryLayout received pins:', pins);
  
  if (!pins || pins.length === 0) {
    return (
      <div style={{ textAlign: 'center', padding: '20px' }}>
        <p>No pins to display</p>
      </div>
    );
  }

  return (
    <div className="animate-slide-fwd">
      <Masonry 
        breakpointCols={breakpointObj}
        className="my-masonry-grid"
        columnClassName="my-masonry-grid_column"
      >
        {pins.map((pin) => (
          <Pin key={pin._id} pin={pin} />
        ))}
      </Masonry>
    </div>
  );
};

export default MasonryLayout;