import { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
// import InfiniteScroll from "react-infinite-scroller";
import SeriesGrid from "./SeriesGrid";
import "./SeriesList.css";
import Footer from "../Footer";
import {
  getSeriesByRating,
  getSeriesDetail,
  getSeriesDetailWithPagination,
  searchSeriesByTitle,
} from "../../api/api";
import { Button, Input, notification, Dropdown, Menu } from "antd";
import { useNavigate } from "react-router-dom";

const { Search } = Input;

const SeriesList = () => {
  const [items, setItems] = useState([]);
  const [hasMore, setHasMore] = useState(true);
  const [selectedSort, setSelectedSort] = useState("");
  const [page, setPage] = useState(1); // Track current page
  const [searchQuery, setSearchQuery] = useState("");
  const [sortLabel, setSortLabel] = useState("Sort By Ratings");

  const ITEMS_PER_PAGE = 30; // Define items per page (matches API limit)

  useEffect(() => {
    fetchMoreData();
  }, []);

  const fetchPaginationData = async (pageNumber = 1, resetItems = false) => {
    try {
      const newItems = await getSeriesDetailWithPagination(
        pageNumber,
        ITEMS_PER_PAGE
      );

      if (resetItems) {
        // reset items and pagination
        setItems(newItems);
        setPage(2);
        setHasMore(newItems.length === ITEMS_PER_PAGE); // Enable or disable infinite scroll
      } else {
        // append new items to the existing list
        setItems((prevItems) => {
          const uniqueItems = newItems.filter(
            (newItem) => !prevItems.some((item) => item.id === newItem.id)
          );
          return [...prevItems, ...uniqueItems];
        });
        setPage((prevPage) => prevPage + 1); // Move to the next page for the next load
        setHasMore(newItems.length === ITEMS_PER_PAGE); // Enable or disable infinite scroll
      }
    } catch (error) {
      console.error("Error fetching more data: ", error);
      setHasMore(false);
      notification.error({
        message: (
          <span className="notification-error-text">Fetching Error</span>
        ),
        description: (
          <span className="notification-error-text">
            {"An error occurred while fetching more data. Please try again."}
          </span>
        ),
        placement: "topRight",
        className: "notification-error-container",
      });
    }
  };

  const fetchMoreData = async () => {
    console.log("Fetching page:", page);

    fetchPaginationData(page);

    // Old implementation
    // try {
    //   const newItems = await getSeriesDetailWithPagination(
    //     page,
    //     ITEMS_PER_PAGE
    //   );
    //   if (newItems.length === 0) {
    //     console.log("No more items to load.");
    //     setHasMore(false); // Stop loading if there are no more items from the API
    //     return;
    //   }
    //   // setItems((prevItems) => [...prevItems, ...newItems]);
    //   setItems((prevItems) => {
    //     const uniqueItems = newItems.filter(
    //       (newItem) => !prevItems.some((item) => item.id === newItem.id)
    //     );
    //     return [...prevItems, ...uniqueItems];
    //   });
    //   setPage((prevPage) => prevPage + 1); // Move to the next page for the next load

    //   if (newItems.length < ITEMS_PER_PAGE) {
    //     setHasMore(false);
    //   }
    // } catch (error) {
    //   console.error("Error fetchig more data: ", error);
    //   setHasMore(false);
    // }
  };

  const handleSortChange = (sortType) => {
    // Toggle the filter off if the same button is clicked twice
    setSelectedSort((prevSort) => (prevSort === sortType ? "" : sortType));
  };

  const handleRatingSort = async (ratingNum, label) => {
    if (sortLabel === `Sorted By ${label}`) {
      // Reset to default items if the same sort is clicked again
      resetRatingSort();
      return;
    }

    try {
      const rating = parseFloat(ratingNum).toFixed(1); // convert to BigDecimal-commpatible string
      setSortLabel(`Sorted By ${label}`);
      const sortedItems = await getSeriesByRating(rating);
      setItems(sortedItems);
      setHasMore(false); //disable infinite scroll
    } catch (error) {
      console.error("Error fetching sorted items: ", error);
      notification.error({
        message: <span className="notification-error-text">Sort Error</span>,
        description: (
          <span className="notification-error-text">
            {"An error occurred while sorting. Please try again."}
          </span>
        ),
        placement: "topRight",
        className: "notification-error-container",
      });
    }
  };

  const sortItems = [
    { label: "5 Stars", key: "5.0" },
    { label: "4 Stars", key: "4.0" },
    { label: "3 Stars", key: "3.0" },
    { label: "2 Stars", key: "2.0" },
    { label: "1 Star", key: "1.0" },
  ];

  const menuProps = {
    items: sortItems.map((item) => ({
      key: item.key,
      label: item.label,
      onClick: () => handleRatingSort(item.key, item.label),
    })),
  };

  const resetRatingSort = async () => {
    setSortLabel("Sort By Ratings");

    fetchPaginationData(1, true); //fetch the initial data again

    // try {
    //   // Fetch the initial data again
    //   const initialItems = await getSeriesDetailWithPagination(
    //     1,
    //     ITEMS_PER_PAGE
    //   );
    //   setItems(initialItems);
    // } catch (error) {
    //   console.error("Error resetting data: ", error);
    //   notification.error({
    //     message: "Error",
    //     description: "Failed to reload series data.",
    //   });
    // }
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
      if (error.response && error.response.status === 404) {
        notification.info({
          message: <span className="notification-text">No Results Found</span>,
          description: (
            <span className="notification-text">
              {`No series found matching "${searchQuery}". Please try another search.`}
            </span>
          ),
          placement: "topRight",
          className: "notification-container",
        });
      } else {
        console.error("Error searching series: ", error);
        notification.error({
          message: (
            <span className="notification-error-text">Search Error</span>
          ),
          description: (
            <span className="notification-error-text">
              {"An error occurred while searching. Please try again."}
            </span>
          ),
          placement: "topRight",
          className: "notification-error-container",
        });
      }
    } finally {
      setHasMore(true); //Re-enable infinite scroll
    }
  };

  const navigate = useNavigate();
  console.log("items in the serieslist page: ", items);
  return (
    <div>
      <div id="series-list-container" className="series-list-container">
        <header className="series-list-header">
          <h1 className="series-title">Series</h1>
          <div className="search-and-dropdown">
            <Search
              className="series-search-input"
              placeholder="Search series"
              allowClear
              size="large"
              onSearch={handleSearch}
            />

            <Dropdown.Button
              menu={menuProps}
              trigger={["click"]}
              size="large"
              className="sort-dropdown"
            >
              <span className="rating-sort-text" onClick={resetRatingSort}>
                {sortLabel}
              </span>
            </Dropdown.Button>

            <Button size="large" onClick={() => navigate("/addSeries")}>
              {" "}
              <span className="add-series-btn">Add Series</span>
            </Button>
          </div>
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
      {/* <Footer /> */}
    </div>
  );
};

export default SeriesList;
