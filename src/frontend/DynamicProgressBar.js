import React, { useState, useEffect } from 'react';

const DynamicProgressBar = () => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Simulate a process that updates the progress
    const interval = setInterval(() => {
      setProgress((prevProgress) => {
        if (prevProgress >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prevProgress + 10; // Increment progress by 10%
      });
    }, 1000); // Update every 1 second

    return () => clearInterval(interval); // Cleanup on unmount
  }, []);

  return (
    <div style={{ width: '80%', margin: '20px auto', border: '1px solid #ccc' }}>
      <div
        style={{
          width: `${progress}%`,
          height: '20px',
          backgroundColor: 'blue',
          transition: 'width 0.5s ease-in-out', // Smooth transition
        }}
      ></div>
      <p style={{ textAlign: 'center' }}>{progress}% Complete</p>
    </div>
  );
};

export default DynamicProgressBar;