import axios from "axios";

const BASE_URL = "http://localhost:8080/api";

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
