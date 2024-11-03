import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import GridItem from "./GridItem";
import "./FilteredPage.css";

const genres = ["All", "Action", "Drama", "History"];
const ITEMS_PER_PAGE = 30; // Maximum 30 items per page

const FilteredPage = () => {
  const [searchParams] = useSearchParams();
  const [currentFilter, setCurrentFilter] = useState("");
  const [currentGenre, setCurrentGenre] = useState("All");
  const [items, setItems] = useState([]);
  const [page, setPage] = useState(1);

  useEffect(() => {
    const type = searchParams.get("type") || "series";
    setCurrentFilter(type);
    fetchItems(type, currentGenre);
  }, [searchParams, currentGenre]);

  const fetchItems = (type, genre) => {
    const mockData = Array.from({ length: 90 }, (_, index) => ({
      id: index + 1,
      title: `${type.charAt(0).toUpperCase() + type.slice(1)} Item ${
        index + 1
      }`,
      genre: genre === "All" ? "Mixed Genre" : genre,
    }));
    setItems(mockData);
    setPage(1);
  };

  const currentPageItems = items.slice(
    (page - 1) * ITEMS_PER_PAGE,
    page * ITEMS_PER_PAGE
  );

  const totalPages = Math.ceil(items.length / ITEMS_PER_PAGE);

  const handleGenreChange = (e) => {
    setCurrentGenre(e.target.value);
    setPage(1);
  };

  return (
    <div className="filtered_page">
      <div className="filters">
        <select value={currentGenre} onChange={handleGenreChange}>
          {genres.map((genre) => (
            <option key={genre} value={genre}>
              {genre}
            </option>
          ))}
        </select>
        <div>Type:{currentFilter === "series" ? "Series" : "Movies"}</div>
      </div>

      <div className="items_grid">
        {currentPageItems.map((item) => (
          <GridItem
            key={item.id}
            title={item.title}
            img="https://via.placeholder.com/200"
          />
        ))}
      </div>

      <div className="pagination">
        <button onClick={() => setPage((prev) => Math.max(prev - 1, 1))}>
          Previous
        </button>
        <span>Page {page}</span>
        <button
          onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default FilteredPage;
