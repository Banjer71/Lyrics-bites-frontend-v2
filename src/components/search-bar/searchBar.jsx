/* eslint-disable no-undef */
import { useState } from "react";
import Header from "../header/header";
import Input from "../reusable/input";
import Button from "../reusable/buttons/button";
import Loader from "../reusable/loader";
import ArtistCard from "../artist-card/artist-card";
import "../../css/searchbar.css";

const SearchBar = () => {
  const [selectParam, setSelectParam] = useState("q_artist");
  const [paramToSearch, setParamToSerach] = useState("");
  const [tune, setTune] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [displayedItems, setDisplayedItems] = useState(4); // Initial number of items to display

  let apiUrl;

  if (import.meta.env.MODE === "test") {
    apiUrl = process.env.VITE_API_TEST_URL;
  } else if (import.meta.env.MODE === "development") {
    apiUrl = process.env.VITE_API_URL;
  } else {
    apiUrl = process.env.VITE_API_KEY_DOMAIN;
  }

  const getData = async () => {
    const url = `${process.env.VITE_API_URL}/${selectParam}/${paramToSearch}`;
    setIsLoading(true);

    try {
      const res = await fetch(url, {
        method: "GET",
        headers: { "Content-type": "application/json" },
      });

      const data = await res.json();
      console.log("data: ", data);
      let song = data.map((item) => item.track);
      setTune((prevTune) => [...prevTune, ...song]);
      setIsLoading(false);
      setParamToSerach("");
    } catch (error) {
      console.error("Error fetching data:", error);
      setIsLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setTune([]);
    setDisplayedItems(4);
    getData();
  };

  const handleChange = (e) => {
    setParamToSerach(e.target.value);
  };

  const getSelectionQuery = (e) => {
    const newValue = e.target.value;
    if (newValue === "q_lyrics") {
      setSelectParam(newValue);
    } else if (newValue === "q_track") {
      setSelectParam(newValue);
    } else {
      setSelectParam(newValue);
    }
  };

  const loadMore = () => {
    setDisplayedItems((prevItems) => prevItems + 4);
  };

  return (
    <div data-testid="searchBar" className="search-bar">
      <Header />
      <div className="field">
        <form className="form-u" onSubmit={handleSubmit}>
          <label htmlFor="select Param">Search a Song </label>
          <select
            value={selectParam}
            onChange={getSelectionQuery}
            id="select Param"
          >
            <option value="q_artist">By Artist</option>
            <option value="q_track">By Song</option>
            <option value="q_lyrics">By Word</option>
          </select>
          <Input
            type="text"
            name="paramToSearch"
            autoComplete="on"
            placeholder="search..."
            value={paramToSearch}
            onChange={handleChange}
          />
          <Button type="submit" disabled={!paramToSearch}>
            Get Songs
          </Button>
        </form>
      </div>
      <div className="grid track">
        {isLoading ? (
          <Loader />
        ) : (
          tune
            .slice(0, displayedItems)
            .map((song) => (
              <ArtistCard
                key={song.track_id}
                track={song}
                album={song.album_name}
              />
            ))
        )}
      </div>
      {tune.length > displayedItems && (
        <div style={{width: '240px', margin: '0 auto'}}><Button onClick={() => loadMore()}>Load More</Button></div>
      )}
    </div>
  );
};

export default SearchBar;
