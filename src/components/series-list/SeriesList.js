import { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
// import InfiniteScroll from "react-infinite-scroller";
import SeriesGrid from "./SeriesGrid";
import "./SeriesList.css";
import Footer from "../Footer";
import {
  getSeriesDetail,
  getSeriesDetailWithPagination,
  searchSeriesByTitle,
} from "../../api/api";
import { Button, Input } from "antd";

const { Search } = Input;

const SeriesList = () => {
  const [items, setItems] = useState([]);
  const [hasMore, setHasMore] = useState(true);
  const [selectedSort, setSelectedSort] = useState("");
  const [page, setPage] = useState(1); // Track current page
  const [searchQuery, setSearchQuery] = useState("");

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
    // Toggle the filter off if the same button is clicked
    // if (selectedSort === sortType) {
    //   setSelectedSort(""); // Unselect the filter
    // } else {
    //   setSelectedSort(sortType); // Apply the new filter
    // }
    // Toggle the filter off if the same button is clicked twice
    setSelectedSort((prevSort) => (prevSort === sortType ? "" : sortType));
  };

  const filteredItems = selectedSort
    ? items.filter((item) => {
        const genre = item.genre.toLowerCase();
        const selectedGenre = selectedSort.toLowerCase();
        return genre.includes(selectedGenre);
      })
    : items; //show all items if no filter is selected

  const uniqueGenres = Array.from(
    new Set(
      items.flatMap((item) => item.genre.split(", ").map((g) => g.trim()))
    )
  );

  const handleSearch = async (value) => {
    setSearchQuery(value);
    setPage(1);
    setHasMore(false); //disable infinite scroll during search

    try {
      const searchResults = await searchSeriesByTitle(value);
      setItems(searchResults);
    } catch (error) {
      console.error("Error searching series: ", error);
    } finally {
      setHasMore(true); //Re-enable infinite scroll
    }
  };

  console.log("items in the serieslist page: ", items);
  return (
    <div>
      <div id="series-list-container" className="series-list-container">
        <header>
          <h1 className="series-title">Series</h1>
          <Search
            className="series-search-input"
            placeholder="Search series"
            allowClear
            size="large"
            onSearch={handleSearch}
          />
          <div className="filters">
            <div className="sort-buttons">
              Sort By:{" "}
              {uniqueGenres.map((genre) => (
                <button
                  key={genre}
                  className={selectedSort === genre ? "active" : ""}
                  onClick={() => handleSortChange(genre)}
                >
                  {genre}
                </button>
              ))}
              {/* old implementation */}
              {/* <button
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
              <button
                className={selectedSort === "Horror" ? "active" : ""}
                onClick={() => handleSortChange("Horror")}
              >
                Horror
              </button>
              <button
                className={selectedSort === "Romance" ? "active" : ""}
                onClick={() => handleSortChange("Romance")}
              >
                Romance
              </button>
              <button
                className={selectedSort === "Melodrama" ? "active" : ""}
                onClick={() => handleSortChange("Melodrama")}
              >
                Melodrama
              </button> */}
            </div>
          </div>
        </header>

        <InfiniteScroll
          dataLength={filteredItems.length}
          next={fetchMoreData}
          hasMore={hasMore}
          loader={<h4>Loading...</h4>}
          // scrollableTarget="series-list-container"
        >
          <SeriesGrid items={filteredItems} className="series-test" />
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
