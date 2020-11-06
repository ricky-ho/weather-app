import React, { useState } from "react";
import { FaSearch } from "react-icons/fa";
import "./Searchbar.css";

function Searchbar({ handleSubmit }) {
  const [query, setQuery] = useState("");

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        handleSubmit(query);
        setQuery("");
      }}
    >
      <div className="searchbar-wrapper">
        <input
          type="text"
          className="searchbar"
          placeholder="Enter city name"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          required
        ></input>
        <button type="submit" className="search-btn">
          <FaSearch />
        </button>
      </div>
    </form>
  );
}

export default Searchbar;
