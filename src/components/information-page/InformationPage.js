import React, { useContext, useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import Footer from "../Footer";
import "./InformationPage.css";
import Content from "./sections/Content";
import DetailPanel from "./sections/DetailPanel";
import TableOfContents from "./sections/TableOfContents";
import AdditionalContent from "./sections/AdditionalContent";
import { getSeriesDetailBySeriesId } from "../../api/api";
import { Button } from "antd";
import { UserContext } from "../../login/UserContext";

const InformationPage = () => {
  const { title } = useParams();
  const location = useLocation();
  const navigate = useNavigate();

  const { user } = useContext(UserContext);
  const isAdmin = user && !user.roles.includes("ROLE_GENERAL");

  const [seriesContent, setSeriesContent] = useState([]);

  const seriesData =
    location.state?.seriesData ||
    JSON.parse(localStorage.getItem("selectedSeries"));

  useEffect(() => {
    const fetchSeriesDetails = async () => {
      try {
        const details = await getSeriesDetailBySeriesId(seriesData.id);
        console.log("series content in info page: ", details);
        setSeriesContent(details);
      } catch (error) {
        console.error("Failed to fetch series content: ", error);
      }
    };

    if (seriesData.id) {
      fetchSeriesDetails();
    }
  }, [seriesData.id]);

  if (!seriesData) {
    return <div>Loading or no data provided...</div>;
  }

  console.log("series data in info page: ", seriesContent);

  return (
    <div className="information_page_wrapper">
      <div className="information_page_content">
        <div className="information_page">
          {/* Title and Introductory Sentence */}
          <div className="page_header">
            <span>{seriesData.title} </span>
            {isAdmin && (
              <div className="btn-container">
                <Button
                  className="add-btn-series"
                  disabled={seriesContent.length !== 0}
                  onClick={() =>
                    navigate(`/addSeriesDetails/${seriesData.title}`)
                  }
                >
                  Add Series Details
                </Button>

                <Button
                  className="add-btn-series"
                  disabled={seriesContent.length === 0}
                  onClick={() =>
                    navigate(`/addSeriesDetails/${seriesData.title}`, {
                      state: { seriesContent },
                    })
                  }
                >
                  Edit
                </Button>
              </div>
            )}
          </div>

          {/* Main Content Section */}
          <div className="main_content">
            {/* Summary Section */}
            <Content seriesContent={seriesContent} />

            {/* Details Panel */}
            <DetailPanel seriesData={seriesData} />
          </div>

          {/* Table of Contents */}
          {/* <TableOfContents scrollToSection={scrollToSection} /> */}
          <AdditionalContent seriesContent={seriesContent} />
          <div className="ai-special-footnote">
            Some information about Extraordinary Attorney Woo was derived from a
            conversation with an AI assistant on December 20, 2024
          </div>
        </div>

        {/* Side Panel */}
        <div className="side_panel">
          <div className="panel_item">
            <h3>Discussion Threads</h3>
            <p>Chat with other users and hundreds of "{title}" fans!</p>
            <button>Join the Discussions</button>
          </div>
          <div className="panel_item">
            <h3>Discord Server</h3>
            <p>Chat with fellow wiki editors and hundreds of "{title}" fans!</p>
            <button>Join the Server</button>
          </div>
        </div>
      </div>
      {/* <Footer /> */}
    </div>
  );
};

export default InformationPage;
