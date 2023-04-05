import React, { useState, useRef,useEffect } from 'react';
import './Player.css';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';

const Card = (props) => {
  return (
    <div className="card">
      <div className="card-content">
        <h2 className="card-title">{props.topic}</h2>
        <p className="card-description">{props.timestamp}</p>
        <p className="card-summary">{props.summary}</p>
      </div>
    </div>
  );
};


const timestamps = [
  {
    image: "https://via.placeholder.com/150",
    timestamp: "00:00:10",
    topic: "Introduction",
    timeInSeconds: 10,
    summary: "Introduction"
  },
  {
    image: "https://via.placeholder.com/150",
    timestamp: "00:00:15",
    topic: "Chapter 1",
    timeInSeconds: 15,
    summary: "Introduction 1"
  },
  {
    image: "https://via.placeholder.com/150",
    timestamp: "00:00:20",
    topic: "Chapter 2",
    timeInSeconds: 20,
    summary: "Introduction 2"
  },
  {
    image: "https://via.placeholder.com/150",
    timestamp: "00:00:25",
    topic: "Conclusion",
    timeInSeconds: 25,
    summary: "Introduction 3"
  },
  {
    image: "https://via.placeholder.com/150",
    timestamp: "00:00:30",
    topic: "Conclusion",
    timeInSeconds: 30,
    summary: "Introduction 4"
  },
  {
    image: "https://via.placeholder.com/150",
    timestamp: "00:03:45",
    topic: "Conclusion",
    timeInSeconds: 225
  },
  {
    image: "https://via.placeholder.com/150",
    timestamp: "00:03:45",
    topic: "Conclusion",
    timeInSeconds: 225
  },
  {
    image: "https://via.placeholder.com/150",
    timestamp: "00:03:45",
    topic: "Conclusion",
    timeInSeconds: 225
  },
  {
    image: "https://via.placeholder.com/150",
    timestamp: "00:03:45",
    topic: "Conclusion",
    timeInSeconds: 225
  }
];

const Player = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [videoDuration, setVideoDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [currentTimestamp, setCurrentTimestamp] = useState(0);
  const videoPlayer = useRef(null);


  const handleTimeClick = (timeInSeconds) => {
    setCurrentTime(timeInSeconds);
    videoPlayer.current.currentTime = timeInSeconds;
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

  const responsive = {
    superLargeDesktop: {
      breakpoint: { max: 4000, min: 3000 },
      items: 5
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 3
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1
    }
  };

    
    const handleTimeUpdate = (currentTime) => {
      const newTimestamp = timestamps.findIndex(
        (timestamp) => timestamp.timeInSeconds > currentTime
      );
      setCurrentTimestamp(newTimestamp === -1 ? timestamps.length - 1 : newTimestamp);
    };


  return (
    <div>
      <br />
      <br />
      <label htmlFor="video-upload" className="upload-btn">Upload video</label>
      <input id='video-upload' type="file" accept='video/*' onChange={handleFileChange} style={{ display: 'none' }} />
      <br />
      <br />
      <br />
      <video className="player" ref={videoPlayer} width="1000px" height="600px" controls onTimeUpdate={(e) => handleTimeUpdate(e.target.currentTime)} onLoadedData={handleVideoLoad}>
      {/* onTimeUpdate={() => setCurrentTime(videoPlayer.current.currentTime)} */}
      </video>
      <br />
      <br />
      
      
      <br />
      <Carousel responsive={responsive} style={{ width: '1000px' }}>
      <div className="timestamp-container" style={{ width: '1000px' }}>
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
      </Carousel>;
      <div>
  {timestamps.map((timestamp, index) => (
    
      <div key={index} style={{ display: currentTimestamp === index ? 'block' : 'none' }}>
      <Card
      topic={timestamp.topic}
      timestamp={timestamp.timestamp}
      timeInSeconds={timestamp.timeInSeconds}
      summary = { timestamp.summary}
    />
    </div>
  ))}
</div>
      
    </div>
  );
};

export default Player;