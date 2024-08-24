/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { useState, useEffect } from "react";
import { fetchAnimeDetails } from "./utils";
import "./InfoPane.css";
import Player from "./Player";

const InfoPane = ({ result, onClose }) => {
  const [anime, setAnime] = useState(null);

  useEffect(() => {
    if (result && result.anilist) {
      const fetchDetails = async () => {
        try {
          const data = await fetchAnimeDetails(result.anilist);
          setAnime(data);
        } catch (error) {
          console.error("Failed to fetch anime details:", error);
        }
      };

      fetchDetails();
    }
  }, [result]);

  if (!anime) return null;

  const title = anime.title || {};
  const synonyms = anime.synonyms || [];

  return (
    <div className="info-pane">
      <button className="close-button" onClick={onClose}>
        ×
      </button>
      <div className="player-pane">
        <Player
          src={result.video}
          fileName={result.filename}
          timeCode={result.timeCode || 0} // Ensure timeCode has a default value
        />
        <div className="drop-effect"></div>
      </div>
      <div className="info-details">
        <div className="info-title">{title.native || title.romaji}</div>
        <div className="divider"></div>
        <div className="details">
          <table>
            <tbody>
              <tr>
                <td colSpan="2" className="detail-item">
                  {anime.episodes ? `${anime.episodes} episodes ` : ""}
                  {anime.duration ? `${anime.duration} minutes ` : ""}
                  {anime.format ? `${anime.format.toLowerCase()} anime.` : ""}
                  <br />
                  {anime.startDate?.year
                    ? `Airing from ${anime.startDate.year}-${anime.startDate.month}-${anime.startDate.day}`
                    : ""}
                  {anime.endDate?.year
                    ? ` to ${anime.endDate.year}-${anime.endDate.month}-${anime.endDate.day}.`
                    : "."}
                </td>
              </tr>
              <tr>
                <td className="detail-label">Aliases</td>
                <td className="detail-item">
                  {synonyms.length > 0
                    ? synonyms.join(", ")
                    : "No aliases available"}
                </td>
              </tr>
              <tr>
                <td className="detail-label">Genres</td>
                <td className="detail-item">
                  {anime.genres?.join(", ") || "No genres available"}
                </td>
              </tr>
              <tr>
                <td className="detail-label">Studios</td>
                <td className="detail-item">
                  {anime.studios?.nodes?.length > 0
                    ? anime.studios.nodes.map((studio, index) => (
                        <a
                          key={index}
                          href={`https://anilist.co/studio/${studio.id}`}
                          className="studio-link"
                        >
                          {studio.name}
                        </a>
                      ))
                    : "No studio information available"}
                </td>
              </tr>
              <tr>
                <td className="detail-label">External Links</td>
                <td className="detail-item">
                  {anime.externalLinks?.length > 0
                    ? anime.externalLinks.map((link, index) => (
                        <a
                          key={index}
                          href={link.url}
                          className="external-link"
                        >
                          {link.site}
                        </a>
                      ))
                    : "No external links available"}
                </td>
              </tr>
              {anime.coverImage?.large && (
                <tr>
                  <td colSpan="2" className="poster">
                    <a
                      href={`https://anilist.co/anime/${result.anilist}`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <img
                        src={anime.coverImage.large}
                        alt={
                          anime.title.romaji ||
                          anime.title.native ||
                          "Anime cover"
                        }
                      />
                    </a>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        <div className="divider"></div>
      </div>
    </div>
  );
};

export default InfoPane;
