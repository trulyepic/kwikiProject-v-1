import React from "react";
import { useLocation, useParams } from "react-router-dom";
import Footer from "../Footer";
import "./InformationPage.css";
import Content from "./sections/Content";
import DetailPanel from "./sections/DetailPanel";
import TableOfContents from "./sections/TableOfContents";
import AdditionalContent from "./sections/AdditionalContent";

const InformationPage = () => {
  const { title } = useParams();
  const location = useLocation();

  const seriesData = location.state?.seriesData;

  if (!seriesData) {
    return <div>Loading or no data provided...</div>;
  }

  console.log("series data in info page: ", seriesData);

  return (
    <div className="information_page_wrapper">
      <div className="information_page_content">
        <div className="information_page">
          {/* Title and Introductory Sentence */}
          <div className="page_header">
            <span>{seriesData.title} </span>
          </div>

          {/* Main Content Section */}
          <div className="main_content">
            {/* Summary Section */}
            <Content />

            {/* Details Panel */}
            <DetailPanel seriesData={seriesData} />
          </div>

          {/* Table of Contents */}
          {/* <TableOfContents scrollToSection={scrollToSection} /> */}
          <AdditionalContent />
        </div>

        {/* Side Panel */}
        <div className="side_panel">
          <div className="panel_item">Ad Placeholder</div>
          <div className="panel_item">Ad Placeholder</div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default InformationPage;
