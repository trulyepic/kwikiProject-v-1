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
