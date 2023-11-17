import React, { useState } from "react";
import Header from "./header";
import Input from "./reusable/input";
import Button from "./reusable/buttons/button";
import Loader from "./loader";
import ArtistCard from "./artist-card";
import '../css/searchbar.css'

const SearchBar = () => {
  const [selectParam, setSelectParam] = useState("q_artist");
  const [paramToSearch, setParamToSerach] = useState("");
  const [tune, setTune] = useState();
  const [isLoading, setIsLoading] = useState(false);

  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   const musicMatch = process.env.VITE_API_KEY_MUSICMATCH;
  //   const restUrl = `track.search?${selectParam}=${paramToSearch}&page_size=4&page=6&page_size=6&f_has_lyrics=1&s_track_rating=desc&apikey=${musicMatch}`;
  //   setIsLoading(true);

  //   const getData = async () => {
  //     const fetchData = await fetch(`/v.1/api/${restUrl}`);
  //     const data = await fetchData.json();
  //     const info = data.message.body.track_list;
  //     console.log(info)
  //     setTune(info);
  //     setIsLoading(false);
  //     setParamToSerach("");
  //   };
  //   getData();
  // };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const url = `https://lyrics-bites-backend-v2.vercel.app/v.1/api/${selectParam}/${paramToSearch}`;
    setIsLoading(true);
    //   const getData = async () => {
    //     const fetchData = await fetch(`/v.1/api/${restUrl}`);
    //     const data = await fetchData.json();
    //     const info = data.message.body.track_list;
    //     console.log(info)
    //     setTune(info);
    //     setIsLoading(false);
    //     setParamToSerach("");
    //   };
    //   getData();
    // };

    const getData = async () => {
      const res = await fetch(url, {
        method: "GET",
        headers: { "Content-type": "application/json" },
      });

      const data = await res.json();
      console.log(data)
      let song = data.map((item) => item.track);
      setTune(song);
      setIsLoading(false);
      setParamToSerach("");
    }
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
  return (
    <div className="search-bar">
      <Header />
      <div className="field">
        <form className="form-u" onSubmit={handleSubmit}>
          <label>Search a Song</label>
          <select value={selectParam} onChange={getSelectionQuery}>
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
          tune &&
          tune.map((song) => {
            return (
              <ArtistCard
                key={song.track_id}
                track={song}
                album={song.album_name}
              />
            );
          })
        )}
      </div>
    </div>
  )
}

export default SearchBar