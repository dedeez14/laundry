import React from 'react';

const Live = () => {
  return (
    <div className='text-center'>
      <iframe
        title="Live Youtube"
        width="605"
        height="315"
        src="https://www.youtube.com/embed/RYvpQ1iVqlQ?autoplay=1&loop=1&controls=0&modestbranding=1&showinfo=0"
        style={{ border: '5px solid #000' }}
        allowFullScreen
      ></iframe>
    </div>
  );
};

export default Live;
