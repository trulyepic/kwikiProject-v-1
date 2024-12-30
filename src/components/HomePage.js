import React, { useEffect, useState } from "react";
import GridItem from "./GridItem";
import "./HomePage.css";
import { useNavigate } from "react-router-dom";
import { getSeriesDetail } from "../api/api";
import Featured from "./Featured";
import Footer from "./Footer";
import { Button, Spin } from "antd";
import { Helmet } from "react-helmet";

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
      <Helmet>
        <title>Home Star Kwiki Hub</title>
        <meta
          name="description"
          content="Discover your favorite series and explore new ones and ratings. 
          Streamlined sorting and filters to show you the best shows based on your preferences, detailed information, and more.."
        />
        <meta
          name="keywords"
          content="series, series list, series details, series information, 
          series ratings, series, movies, entertainment, discover shows, 
          featured series, korean series, korean movies, kdrama, k-drama, k-movies, 
          korean drama, korean movies, korean entertainment"
        />
        <meta name="author" content="Star Kwiki Hub" />
      </Helmet>
      <Featured />
      <div className="app_grid">
        <h2>Popular Series</h2>
        <Spin spinning={loading} size="large" tip="Loading series...">
          <div className="grid_container">
            {seriesData.slice(0, 8).map((show) => (
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
      {/* <Footer /> */}
    </div>
  );
};

export default HomePage;
