import React, { useEffect, useState } from "react";
import GridItem from "./GridItem";
import "./HomePage.css";
import { useNavigate } from "react-router-dom";
import { getSeriesDetail } from "../api/api";
import Featured from "./Featured";
import Footer from "./Footer";
import { Button, Spin } from "antd";

const HomePage = () => {
  const navigate = useNavigate();
  const [seriesData, setSeriesData] = useState([]);
  const [loading, setLoading] = useState(true);

  const handleMoreClick = (type) => {
    navigate(`/seriesList?type=${type}`);
  };

  useEffect(() => {
    const fetchSeries = async () => {
      try {
        const data = await getSeriesDetail();
        setSeriesData(data);
      } catch (error) {
        console.error("Failed to fetch series: ", error);
      } finally {
        setLoading(false);
      }
    };

    fetchSeries();
  }, []);

  const BASE_URL = "http://localhost:8080";
  return (
    <div className="homepage_container">
      <Featured />
      <div className="app_grid">
        <h2>Series</h2>
        <Spin spinning={loading} size="large" tip="Loading series...">
          <div className="grid_container">
            {seriesData.slice(0, 10).map((show) => (
              <GridItem
                key={show.id}
                id={show.id}
                title={show.title}
                // img={show.img}
                // img={`${BASE_URL}${show.imageLink}`}
                img={show.imageUrl}
                seriesData={seriesData}
              />
            ))}
          </div>
        </Spin>

        <Button
          type="primary"
          size="large"
          className="more_button"
          onClick={() => handleMoreClick("series")}
        >
          {">>"}
        </Button>
      </div>
      <Footer />
    </div>
  );
};

export default HomePage;
