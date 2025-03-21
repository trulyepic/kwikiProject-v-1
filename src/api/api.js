import axios from "axios";

// const BASE_URL = "http://localhost:8080/api";
// const BASE_URL = "http://localhost:7000/api";

// const BASE_URL =
//   "http://kviki-env.eba-b6newnia.us-west-1.elasticbeanstalk.com/api";

const BASE_URL = process.env.REACT_APP_BASE_URL;

export const getSeriesDetail = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/getAllSeries`);
    console.log("respons data", response.data);
    return response.data;
  } catch (error) {
    console.error("Error fetching series: ", error);
    throw error;
  }
};

export const getSeriesDetailWithPagination = async (page = 1, limit = 30) => {
  try {
    const response = await axios.get(`${BASE_URL}/getAllSeriesPagination`, {
      params: { page, limit },
    });
    console.log("page: ", response.data);
    return response.data;
  } catch (error) {
    console.error("Error fetching series: ", error);
  }
};

export const getCharacterBySeriesId = async (seriesId) => {
  try {
    const response = await axios.get(
      `${BASE_URL}/series/${seriesId}/characters`
    );
    console.log("characters data: ", response.data);
    return response.data;
  } catch (error) {
    console.error("Error fetching characters: ", error);
    throw error;
  }
};

export const getCharacterDetailByCharacterId = async (characterId) => {
  try {
    const response = await axios.get(
      `${BASE_URL}/characters/${characterId}/content`
    );
    console.log("character content from api: ", response.data);
    return response.data;
  } catch (error) {
    console.error("Error fetching character content: ", error);
    throw error;
  }
};

export const getSeriesDetailBySeriesId = async (seriesId) => {
  try {
    const response = await axios.get(`${BASE_URL}/series/${seriesId}/content`);
    return response.data;
  } catch (error) {
    console.error("Error fetching series details: ", error);
    throw error;
  }
};

export const addRating = async (seriesId, rating) => {
  try {
    await axios.post(`${BASE_URL}/series/${seriesId}/rate`, rating, {
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error adding rating: ", error);
    throw error;
  }
};

export const getAverageRating = async (seriesId) => {
  try {
    const response = await axios.get(`${BASE_URL}/series/${seriesId}/rating`);
    return response.data;
  } catch (error) {
    console.error("Error fetching average rating: ", error);
    throw error;
  }
};

export const getTotalRatings = async (seriesId) => {
  try {
    const response = await axios.get(
      `${BASE_URL}/series/${seriesId}/totalRatings`
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching total ratings: ", error);
    throw error;
  }
};

export const getCharacterDetailByName = async (characterName) => {
  try {
    const response = await axios.get(
      `${BASE_URL}/characters/name/${characterName}`
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching total ratings: ", error);
    throw error;
  }
};

export const searchSeriesByTitle = async (title) => {
  try {
    const response = await axios.get(`${BASE_URL}/search/series`, {
      params: { title },
    });
    return response.data;
  } catch (error) {
    if (error.response && error.status === 404) {
      //if the series is not found. return an empty array or null
      return [];
    }
    console.error("Error searching series: ", error);
    throw error;
  }
};

export const getSeriesByRating = async (rating) => {
  try {
    const response = await axios.get(`${BASE_URL}/series/by-rating`, {
      params: { rating },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching series by rating: ", error);
    throw error;
  }
};

export const saveSeries = async (formData) => {
  try {
    const response = await axios.post(`${BASE_URL}/series/save`, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return response.data;
  } catch (error) {
    console.log("Error saving series: ", error);
    throw error;
  }
};

export const addCharacter = async (characterData, imageFile) => {
  try {
    const formData = new FormData();
    formData.append(
      "character",
      new Blob([JSON.stringify(characterData)], { type: "application/json" })
    );
    if (imageFile) {
      formData.append("image", imageFile);
    }

    const response = await axios.post(`${BASE_URL}/character/add`, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return response.data;
  } catch (error) {
    console.error("Error adding character:", error);
    throw error;
  }
};

export const updateCharacter = async (
  characterId,
  characterData,
  imageFile
) => {
  try {
    const formData = new FormData();
    formData.append(
      "character",
      new Blob([JSON.stringify(characterData)], { type: "application/json" })
    );

    if (imageFile) {
      formData.append("image", imageFile);
    }

    const response = await axios.put(
      `${BASE_URL}/character/update/${characterId}`,
      formData,
      {
        headers: { "Content-Type": "multipart/form-data" },
      }
    );

    return response.data;
  } catch (error) {
    console.error("Error updating character:", error);
    throw error;
  }
};

export const checkActorExists = async (realName) => {
  try {
    const response = await axios.get(`${BASE_URL}/actor/exists`, {
      params: { realName },
    });
    return response.data;
  } catch (error) {
    if (error.response && error.response.status === 404) {
      return null; // Actor not found
    }
    console.error("Error checking actor existence:", error);
    throw error;
  }
};

export const addActor = async (actorData) => {
  try {
    const response = await axios.post(`${BASE_URL}/actor/add`, actorData, {
      headers: { "Content-Type": "application/json" },
    });
    return response.data;
  } catch (error) {
    console.error("Error adding actor:", error);
    throw error;
  }
};

export const getCharacterById = async (characterId) => {
  try {
    const response = await axios.get(`${BASE_URL}/character/${characterId}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching character details:", error);
    throw error;
  }
};

export const saveSeriesDetails = async (seriesDetails) => {
  try {
    const response = await axios.post(
      `${BASE_URL}/series/details/save`,
      seriesDetails,
      {
        headers: { "Content-Type": "application/json" },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error saving series details:", error);
    throw error;
  }
};

export const updateSeriesDetails = async (seriesDetails) => {
  try {
    if (!seriesDetails.detailId) {
      throw new Error("Missing detail ID for update");
    }

    const response = await axios.put(
      `${BASE_URL}/series/details/update`,
      seriesDetails,
      {
        headers: { "Content-Type": "application/json" },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error updating series details:", error);
    throw error;
  }
};

export const saveCharacterDetails = async (characterDetails) => {
  try {
    const response = await axios.post(
      `${BASE_URL}/character/details/save`,
      characterDetails,
      {
        headers: { "Content-Type": "application/json" },
      }
    );
    return response.data;
  } catch (error) {
    console.log("Error saving character details:", error);
    throw error;
  }
};

export const updateCharacterDetails = async (characterDetails) => {
  try {
    // if (!characterDetails.contentId) {
    //   throw new Error("Missing content ID for update.");
    // }

    const response = await axios.put(
      `${BASE_URL}/character/details/update`,
      characterDetails,
      {
        headers: { "Content-Type": "application/json" },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error updating character details:", error);
    throw error;
  }
};

export const updateActorDetails = async (actorDetails) => {
  try {
    const response = await axios.put(`${BASE_URL}/actor/update`, actorDetails, {
      headers: { "Content-Type": "application/json" },
    });
    return response.data;
  } catch (err) {
    console.error("Error updating actor details:", err);
    throw err;
  }
};

export const getActorDetailsByName = async (realName) => {
  try {
    const response = await axios.get(`${BASE_URL}/actor/details`, {
      params: { realName },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching actor details:", error);
    throw error;
  }
};
