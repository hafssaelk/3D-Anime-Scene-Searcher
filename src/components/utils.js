// src/utils/fetchAnimeDetails.js
import axios from "axios";

export const fetchAnimeDetails = async (anilistId) => {
  const query = `
    query ($id: Int) {
      Media(id: $id) {
        title {
          romaji
          native
        }
        episodes
        duration
        format
        startDate {
          year
          month
          day
        }
        endDate {
          year
          month
          day
        }
        synonyms
        genres
        studios {
          nodes {
            id
            name
          }
        }
        externalLinks {
          url
          site
        }
        coverImage {
          large
        }
      }
    }
  `;

  const variables = {
    id: anilistId,
  };

  const url = 'https://graphql.anilist.co';

  try {
    const response = await axios.post(url, {
      query,
      variables,
    });
    return response.data.data.Media;
  } catch (error) {
    console.error('Error fetching anime details:', error);
    return null;
  }
};


const formatTime = (timeInSeconds) => {
	const sec_num = parseInt(timeInSeconds, 10);
	const hours = Math.floor(sec_num / 3600);
	const minutes = Math.floor((sec_num - hours * 3600) / 60);
	const seconds = sec_num - hours * 3600 - minutes * 60;
  
	return hours > 0
	  ? [
		  hours < 10 ? `0${hours}` : hours,
		  minutes < 10 ? `0${minutes}` : minutes,
		  seconds < 10 ? `0${seconds}` : seconds,
		].join(":")
	  : [
		  minutes < 10 ? `0${minutes}` : minutes,
		  seconds < 10 ? `0${seconds}` : seconds,
		].join(":");
  };
  
  export { formatTime };
  