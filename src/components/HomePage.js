import React, { useEffect, useState } from "react";
import GridItem from "./GridItem";
import "./HomePage.css";
import { useNavigate } from "react-router-dom";
import { getSeriesDetail } from "../api/api";
import Featured from "./Featured";
import Footer from "./Footer";
import { Button } from "antd";

const HomePage = () => {
  const navigate = useNavigate();
  const [seriesData, setSeriesData] = useState([]);

  const series = [
    { title: "Grotesquerie", img: "https://via.placeholder.com/200" },
    { title: "Doctor Odyssey", img: "https://via.placeholder.com/200" },
    { title: "Chief Detective 1958", img: "https://via.placeholder.com/200" },
    { title: "Uncle Samsik", img: "https://via.placeholder.com/200" },
    { title: "Uncle Samsik", img: "https://via.placeholder.com/200" },
    { title: "Uncle Samsik", img: "https://via.placeholder.com/200" },
    { title: "She Taught Love", img: "https://via.placeholder.com/200" },
    { title: "Perfect Days", img: "https://via.placeholder.com/200" },
    { title: "The Promised Land", img: "https://via.placeholder.com/200" },
    { title: "The First Omen", img: "https://via.placeholder.com/200" },
    { title: "The First Omen", img: "https://via.placeholder.com/200" },
    { title: "The First Omen", img: "https://via.placeholder.com/200" },
  ];

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
