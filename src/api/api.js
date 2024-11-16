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
