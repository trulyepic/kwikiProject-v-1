import { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import SeriesGrid from "./SeriesGrid";
import "./SeriesList.css";
import Footer from "../Footer";

const SeriesList = () => {
  const [items, setItems] = useState([]);
  const [hasMore, setHasMore] = useState(true);
  const [selectedSort, setSelectedSort] = useState("Action");

  useEffect(() => {
    fetchMoreData();
  }, []);

  const fetchMoreData = () => {
    if (items.length >= 50) {
      setHasMore(false);
      return;
    }
    //simulate fetching data

    const newItems = Array.from({ length: 100 }, (_, i) => ({
      id: items.length + i + 1,
      title: `Series ${items.length + i + 1}`,
      genre: "Romance",
    }));
    setItems([...items, ...newItems]);
  };

  const handleSortChange = (sortType) => {
    setSelectedSort(sortType);
    // Add sort logic here if needed
  };

  return (
    <div>
      <div className="series-list-container">
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
        >
          <SeriesGrid items={items} />
        </InfiniteScroll>
      </div>
      <Footer />
    </div>
  );
};

export default SeriesList;
