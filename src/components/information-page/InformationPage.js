import React from "react";
import { useParams } from "react-router-dom";
import Footer from "../Footer";
import "./InformationPage.css";
import Content from "./sections/Content";
import DetailPanel from "./sections/DetailPanel";
import TableOfContents from "./sections/TableOfContents";
import AdditionalContent from "./sections/AdditionalContent";

const InformationPage = () => {
  const { title } = useParams();

  return (
    <div className="information_page_wrapper">
      <div className="information_page_content">
        <div className="information_page">
          {/* Title and Introductory Sentence */}
          <div className="page_header">
            <span>{title} </span>
            {/* <p>
            This article is about the original TV series. For other pages with
            the same name, see <a href="/">The {title} Television Universe</a>.
          </p> */}
          </div>

          {/* Main Content Section */}
          <div className="main_content">
            {/* Summary Section */}
            <Content />

            {/* Details Panel */}
            <DetailPanel title={title} />
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
