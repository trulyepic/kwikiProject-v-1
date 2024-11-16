import { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
// import InfiniteScroll from "react-infinite-scroller";
import SeriesGrid from "./SeriesGrid";
import "./SeriesList.css";
import Footer from "../Footer";
import { getSeriesDetail, getSeriesDetailWithPagination } from "../../api/api";
import { Button } from "antd";

const SeriesList = () => {
  const [items, setItems] = useState([]);
  const [hasMore, setHasMore] = useState(true);
  const [selectedSort, setSelectedSort] = useState("Action");
  const [page, setPage] = useState(1); // Track current page
  const ITEMS_PER_PAGE = 30; // Define items per page (matches API limit)

  useEffect(() => {
    fetchMoreData();
  }, []);

  const fetchMoreData = async () => {
    console.log("Fetching page:", page);
    try {
      const newItems = await getSeriesDetailWithPagination(
        page,
        ITEMS_PER_PAGE
      );
      if (newItems.length === 0) {
        console.log("No more items to load.");
        setHasMore(false); // Stop loading if there are no more items from the API
        return;
      }
      // setItems((prevItems) => [...prevItems, ...newItems]);
      setItems((prevItems) => {
        const uniqueItems = newItems.filter(
          (newItem) => !prevItems.some((item) => item.id === newItem.id)
        );
        return [...prevItems, ...uniqueItems];
      });
      setPage((prevPage) => prevPage + 1); // Move to the next page for the next load

      if (newItems.length < ITEMS_PER_PAGE) {
        setHasMore(false);
      }
    } catch (error) {
      console.error("Error fetchig more data: ", error);
      setHasMore(false);
    }
  };

  const handleSortChange = (sortType) => {
    setSelectedSort(sortType);
    // Add sort logic here if needed
  };

  return (
    <div>
      <div id="series-list-container" className="series-list-container">
        <header>
          <h1 className="series-title">Series</h1>
          <div className="filters">
            <div className="sort-buttons">
              Sort By:{" "}
              <button
                className={selectedSort === "Action" ? "active" : ""}
                onClick={() => handleSortChange("Action")}
              >
                Action
              </button>
              <button
                className={selectedSort === "Thriller" ? "active" : ""}
                onClick={() => handleSortChange("Thriller")}
              >
                Thriller
              </button>
              <button
                className={selectedSort === "Mystery" ? "active" : ""}
                onClick={() => handleSortChange("Mystery")}
              >
                Mystery
              </button>
            </div>
          </div>
        </header>

        <InfiniteScroll
          dataLength={items.length}
          next={fetchMoreData}
          hasMore={hasMore}
          loader={<h4>Loading...</h4>}
          // scrollableTarget="series-list-container"
        >
          <SeriesGrid items={items} className="series-test" />
          {hasMore && (
            <Button
              type="primary"
              onClick={fetchMoreData}
              className="load-more-btn"
            >
              Load More
            </Button>
          )}
        </InfiniteScroll>
      </div>
      <Footer />
    </div>
  );
};

export default SeriesList;
