import React, { useState, useRef } from 'react';
import './Player.css';

const timestamps = [
  {
    image: "https://via.placeholder.com/150",
    timestamp: "00:00:20",
    topic: "Introduction",
    timeInSeconds: 20
  },
  {
    image: "https://via.placeholder.com/150",
    timestamp: "00:00:23",
    topic: "Chapter 1",
    timeInSeconds: 23
  },
  {
    image: "https://via.placeholder.com/150",
    timestamp: "00:02:10",
    topic: "Chapter 2",
    timeInSeconds: 130
  },
  {
    image: "https://via.placeholder.com/150",
    timestamp: "00:03:45",
    topic: "Conclusion",
    timeInSeconds: 225
  },
];

const Player = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [videoDuration, setVideoDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [seekTime, setSeekTime] = useState(0);
  const videoPlayer = useRef(null);

  const togglePlay = () => {
    if (isPlaying) {
      videoPlayer.current.pause();
    } else {
      videoPlayer.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  const handleSeek = () => {
    videoPlayer.current.currentTime = seekTime;
};

  const handleTimeInputChange = (e) => {
    const timeInSeconds = e.target.value;
    setCurrentTime(timeInSeconds);
    videoPlayer.current.currentTime = timeInSeconds;
  };

  const handleTimeClick = (timeInSeconds) => {
    setCurrentTime(timeInSeconds);
    videoPlayer.current.currentTime = timeInSeconds;
  };

  const formatTime = (timeInSeconds) => {
    const date = new Date(null);
    date.setSeconds(timeInSeconds);
    return date.toISOString().substr(11, 8);
  };

  const handleVideoLoad = () => {
    setVideoDuration(videoPlayer.current.duration);
  };

  function handleFileChange(event) {
    const filePath = event.target.files[0];
    if (filePath) {
      const file = URL.createObjectURL(filePath);
      videoPlayer.current.src = file;
    }
  }

  return (
    <div>
      <br />
      <br />
      <label htmlFor="video-upload" className="upload-btn">Upload video</label>
      <input id='video-upload' type="file" accept='video/*' onChange={handleFileChange} style={{ display: 'none' }} />
      <br />
      <br />
      <br />
      <video className="player" ref={videoPlayer} width="1000px" height="600px" controls onTimeUpdate={() => setCurrentTime(videoPlayer.current.currentTime)} onLoadedData={handleVideoLoad}>
        {/* <source src={v} type="video/mp4" /> */}
      </video>
      <br />
      <br />
      <input type="range" min={0} max={videoDuration} value={currentTime} step={1} onChange={handleTimeInputChange} />
      <br />
      <br />
      <label htmlFor="seek-input">Seek to time:</label>
      <input className='input-time' type="number" id="seek-input" value={seekTime} onChange={e => setSeekTime(e.target.value)} min="0" max={videoPlayer.current && videoPlayer.current.duration} step="any" />
      <button id='btn-go' onClick={handleSeek}>Go</button>
      <br />
      <div className="timestamp-container">
        {timestamps.map((timestamp) => (
          <div className="timestamp-item" key={timestamp.timestamp}>
            
            <img src={`/${timestamp.image}`} alt={`Timestamp at ${timestamp.timestamp}`} onClick={() => handleTimeClick(timestamp.timeInSeconds)} style={{ cursor: "pointer" }} />
            <div className="timestamp-details">
              <p className="timestamp-time">{timestamp.timestamp}</p>
              <p className="timestamp-topic">{timestamp.topic}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Player;