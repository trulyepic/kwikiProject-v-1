import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getTopRatedSeriesWithPagination } from "../api/api";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { StarFilled } from "@ant-design/icons";
import InfiniteScroll from "react-infinite-scroll-component";
import "./TopSeries.css";
import Rating from "../components/ratings/Rating";

const TopSeries = () => {
  const [seriesList, setSeriesList] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const navigate = useNavigate();
  const ITEMS_PER_PAGE = 30;

  const fetchSeries = async () => {
    try {
      const newSeries = await getTopRatedSeriesWithPagination(
        page,
        ITEMS_PER_PAGE
      );
      setSeriesList((prev) => [...prev, ...newSeries]);
      setHasMore(newSeries.length === ITEMS_PER_PAGE);
      setPage((prev) => prev + 1);
    } catch (error) {
      console.error("Error fetching top series:", error);
      setHasMore(false);
    }
  };

  useEffect(() => {
    fetchSeries();
  }, []);

  const handleClick = (series) => {
    localStorage.setItem(
      "selectedSeries",
      JSON.stringify({ img: series.imageUrl, seriesId: series.id, ...series })
    );

    navigate(`/series/${series.title}`, {
      state: {
        img: series.imageUrl,
        seriesId: series.id,
        seriesData: series,
      },
    });
  };

  return (
    <div className="top-series-container">
      <h1 className="top-series-header">Top Series</h1>
      <InfiniteScroll
        dataLength={seriesList.length}
        next={fetchSeries}
        hasMore={hasMore}
        loader={<h4>Loading...</h4>}
      >
        <div className="table-scroll-wrapper">
          <table className="top-series-table">
            <thead>
              <tr>
                <th>Rank</th>
                <th>Image</th>
                <th>Title</th>
                <th className="ratings-header">Ratings</th>
              </tr>
            </thead>

            <tbody>
              {seriesList.map((series, index) => (
                <tr
                  key={series.id}
                  onClick={() => handleClick(series)}
                  className="top-series-row"
                >
                  <td>{index + 1}</td>
                  <td className="image-cell">
                    <LazyLoadImage
                      src={series.imageUrl}
                      alt={series.title}
                      className="top-series-thumbnail"
                    />
                  </td>
                  <td className="title-cell">
                    <div className="series-title">{series.title}</div>
                    <div className="series-sub-info">
                      {`TV (${series.episode} eps) • ${series.originalRelease} 
                    `}
                      <div> {series.genre}</div>
                    </div>
                  </td>
                  <td className="rating-cell">
                    <div className="rating-cell-inner">
                      <Rating seriesId={series.id} />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </InfiniteScroll>
    </div>
  );
};

export default TopSeries;
