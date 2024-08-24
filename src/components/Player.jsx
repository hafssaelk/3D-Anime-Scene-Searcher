/* eslint-disable no-unused-vars */
import React, { useEffect, useState, useRef } from "react";
import PropTypes from "prop-types";
import "./Player.css";
import { formatTime } from "./utils";

const Player = ({ src, fileName, timeCode = 0 }) => {
  const playerRef = useRef(null);
  const [isMute, setIsMute] = useState(false); // Start with sound enabled by default
  const [duration, setDuration] = useState(0);
  const [playerWidth, setPlayerWidth] = useState(640);
  const [playerHeight, setPlayerHeight] = useState(360);
  const [playerSrc, setPlayerSrc] = useState("");

  const playPause = () => {
    if (playerRef.current.paused) {
      playerRef.current.play();
    } else {
      playerRef.current.pause();
    }
  };

  const toggleMute = () => {
    const newMuteState = !isMute;
    setIsMute(newMuteState);
    if (playerRef.current) {
      playerRef.current.muted = newMuteState;
    }
  };

  const handleResize = () => {
    const newWidth = window.innerWidth > 640 ? 640 : window.innerWidth;
    setPlayerWidth(newWidth);
    setPlayerHeight((newWidth / 640) * 360);
  };

  useEffect(() => {
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    if (!src) return;

    if (playerRef.current) {
      playerRef.current.pause();
      playerRef.current.style.opacity = 0;
      setDuration(0);
    }

    (async () => {
      try {
        const response = await fetch(`${src}&size=l`);
        const blob = await response.blob();
        setPlayerSrc(URL.createObjectURL(blob));
        const videoDuration = parseFloat(response.headers.get("x-video-duration"));
        setDuration(videoDuration);
      } catch (error) {
        console.error("Failed to load video:", error);
      }
    })();
  }, [src]);

  useEffect(() => {
    if (playerRef.current) {
      playerRef.current.volume = 1.0; // Explicitly set the volume to maximum
      playerRef.current.muted = isMute; // Ensure mute state is respected
    }
  }, [isMute]);

  return (
    <div className="playerPane">
      <video
        ref={playerRef}
        className="player"
        src={playerSrc}
        width={playerWidth}
        height={playerHeight}
        muted={isMute}
        autoPlay
        loop
        playsInline
        onLoadedMetadata={(e) => {
          e.target.style.opacity = 1;
          setPlayerHeight((playerWidth / e.target.videoWidth) * e.target.videoHeight);
        }}
        onClick={playPause}
      ></video>
      <div className="playerInfo">
        <div className="fileNameDisplay">{fileName}</div>
        <div className="timeCodeDisplay">
          {formatTime(timeCode)} / {formatTime(duration)}
        </div>
      </div>
      <div className="playerControl">
        <div
          className={`soundBtn ${isMute ? "iconVolumeOff" : "iconVolumeUp"}`}
          onClick={toggleMute}
        ></div>
        <div
          className="progressBarControl"
          style={{ left: `${(timeCode / duration) * playerWidth - 6}px` }}
        >
          ▲
        </div>
      </div>
    </div>
  );
};

Player.propTypes = {
  src: PropTypes.string.isRequired,
  fileName: PropTypes.string.isRequired,
  timeCode: PropTypes.number,
};

export default Player;
