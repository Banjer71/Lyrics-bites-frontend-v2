import React, { useEffect, useState, useContext } from "react";
import { redirect } from "react-router-dom";
import CheckBox from "./checkbox";
import SongLabel from "./song-label";
import LabelSong from "./label-song";
import { AuthContext } from "./context/AuthContext";
import '../css/displayallsongs.css'

const DisplayAllSongs = () => {
  const auth = useContext(AuthContext);
  const { authState } = auth;
  const [displayAll, setDisplayAll] = useState();
  const [ids, setIds] = useState([]);

  useEffect(() => {
    fetch(`/v.1/api/all/${authState.userInfo.email}`)
      .then((res) => res.json())
      .then((data) => {
        setDisplayAll(data);
      });
  }, [authState.userInfo.email]);

  const deleteAllSongs = () => {
    fetch(`/v.1/api/all/${authState.userInfo.email}`, {
      method: "DELETE",
    }).then((res) => res.json());
    setDisplayAll([]);
  };

  const selectSong = (e) => {
    const selectedId = e.target.value;
    if (ids.includes(selectedId)) {
      const newIds = ids.filter((id) => id !== selectedId);
      setIds(newIds);
    } else {
      const newIds = [...ids, selectedId];
      setIds(newIds);
    }
  };

  const removeSongsById = () => {
    const remainingSong = displayAll.filter((song) => !ids.includes(song._id));
    fetch(`/v.1/api/delete/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(ids),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setDisplayAll(remainingSong);
      });
  };

  return (
    <>
      {auth.isAuthenticated() ? (
        <div className="display-all-songs-wrapper">
          <h1>Your Song Collection</h1>
          <div className="display-all-songs">
            {displayAll && displayAll.length !== 0 ? (
              displayAll.map((song) => {
                return (
                  <LabelSong key={song._id}>
                    <SongLabel
                      key={song._id}
                      song={song}
                      displayAll={displayAll}
                    />
                    <CheckBox
                      label="Delete"
                      value={song._id}
                      onChange={selectSong}
                      checked={ids.includes(song._id) ? true : false}
                    />
                  </LabelSong>
                );
              })
            ) : (
              <p style={{ textAlign: "center" }}>Your songs list is empty</p>
            )}
            <button type="button" onClick={removeSongsById}>
              Delete Selected Product(s)
            </button>
            <button onClick={deleteAllSongs}>Delete all songs</button>
          </div>
        </div>
      ) : (
        redirect("/signup")
      )}
    </>
  );
};

export default DisplayAllSongs;