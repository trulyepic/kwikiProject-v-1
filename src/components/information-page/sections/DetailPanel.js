import React from "react";
import { convertToArray } from "../../../util/convertoArray";

const DetailPanel = ({ seriesData }) => {
  //convert to an array

  const directorArray = convertToArray(seriesData.director);
  const writerArray = convertToArray(seriesData.writer);
  const networkArray = convertToArray(seriesData.network);
  const genreArray = convertToArray(seriesData.genre);

  console.log("directorArray: ", directorArray);

  return (
    <div className="details_panel">
      <img
        src="https://via.placeholder.com/200"
        alt={seriesData.title}
        className="title_image"
      />
      <div className="details_box">
        <div className="detail_item">
          <span className="label">Genre</span>
          <span className="value">
            <ul className="detail_item-ul">
              {genreArray.map((genre, index) => (
                <li key={index}>{genre}</li>
              ))}
            </ul>
          </span>
        </div>
        <div className="detail_item">
          <span className="label">Network</span>
          <span className="value">
            <ul className="detail_item-ul">
              {networkArray.map((network, index) => (
                <li key={index}>{network}</li>
              ))}
            </ul>
          </span>
        </div>
        <div className="detail_item">
          <span className="label">Director</span>
          <span className="value">
            <ul className="detail_item-ul">
              {directorArray.map((director, index) => (
                <li key={index}>{director}</li>
              ))}
            </ul>
          </span>
        </div>
        <div className="detail_item">
          <span className="label">Writer</span>
          <span className="value">
            <ul className="detail_item-ul">
              {writerArray.map((writer, index) => (
                <li key={index}>{writer}</li>
              ))}
            </ul>
          </span>
        </div>
        <div className="detail_item">
          <span className="label">Season</span>
          <span className="value">{seriesData.seasons}</span>
        </div>
        <div className="detail_item">
          <span className="label">Episodes</span>
          <span className="value">{seriesData.episode}</span>
        </div>
        <div className="detail_item">
          <span className="label">Original Run</span>
          <span className="value">{seriesData.originalRelease}</span>
        </div>
      </div>
    </div>
  );
};

export default DetailPanel;
