/* eslint-disable react/no-unknown-property */
/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React from "react";
import "./Result.css";
import { formatTime } from "./utils"; 

const zeroPad = (n, width) => {
  return n.toString().padStart(width, "0");
};

const Result = ({ searchResult: entry, active: isActive, onClick }) => {
  const timeCode =
    formatTime(entry.from) === formatTime(entry.to)
      ? formatTime(entry.from)
      : `${formatTime(entry.from)} - ${formatTime(entry.to)}`;

  return (
    <div
      className={`result-item ${isActive ? "active" : ""}`}
      style={{ display: entry.anilist.isAdult ? "none" : "flex" }}
      onClick={onClick}
    >
      <video
        className="result-video"
        src={entry.similarity > 0.87 ? `${entry.video}&size=s` : ""}
        poster={`${entry.image}&size=s`}
        volume="0"
        muted
        autoPlay
        loop
        playsInline
        onContextMenu={(e) => e.preventDefault()}
      ></video>
      <div className="result-details">
        <div className="title">
          {entry.anilist.title?.native || entry.anilist.title?.romaji || entry.anilist.id}
        </div>
        <div className="detail">
          <div className="ep">{entry.episode && `Episode ${zeroPad(entry.episode, 2)}`}</div>
          <div className="time">{timeCode}</div>
          <div className="similarity">{`~${(entry.similarity * 100).toFixed(2)}% Similarity`}</div>
        </div>
      </div>
    </div>
  );
};

export default Result;
