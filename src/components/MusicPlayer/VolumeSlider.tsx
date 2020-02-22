import React, { useRef } from 'react';

const VolumeSlider: React.FC = () => {
  const volumeSlider = useRef<HTMLInputElement>(
    document.createElement('input'),
  );

  return (
    <div className="h-100">
      {/* <input type="range" ref={volumeSlider} min={0} max={maxVolume} value={currentVolume} onChange={handleVolume} className="seeker"/> */}
    </div>
  );
};

export default VolumeSlider;
