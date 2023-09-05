import React from 'react';

const Live = () => {
  return (
    <div className='text-center'>
      <iframe
        title="Live Youtube"
        width="627"
        height="315"
        src="https://www.youtube.com/embed/RYvpQ1iVqlQ"
        frameBorder="1"
        style={{ border: '5px solid #000' }}
        allowFullScreen
        rounded
      ></iframe>
    </div>
  );
};

export default Live;
