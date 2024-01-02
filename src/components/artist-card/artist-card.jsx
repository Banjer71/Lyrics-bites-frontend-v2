import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import defImg from "/imageDef.png";
import "../../css/artistcard.css";

const ArtistCard = ({ track }) => {
  const [cover, setCover] = useState("");

  useEffect(() => {
    let albumName = track.album_name;
    const url = `${process.env.VITE_API_URL}/cover/2.0/${albumName}`
    const fetchCover = async () => {
      const response = await fetch(url, {
        method: "GET",
        headers: { "Content-type": "application/json" },
      });
      const covers = await response.json();
      setCover(covers);
    };
    fetchCover()
  }, [track.album_name]);

  return (
    <div className="card" data-testid='album'>
      {cover ? <img src={cover} alt="pic" /> : <img src={defImg} alt="pic" />}
      <Link
        className="card-link"
        to="/SongPage"
        state={{
          album_id: track.album_id,
          album: track.album_name,
          trackId: track.track_id,
          artistId: track.artist_id,
          artistName: track.artist_name,
          songTitle: track.track_name,
        }}
      >
        <p>{track.artist_name}</p>
        <p>{track.album_name}</p>
        <p>{track.track_name}</p>
      </Link>
    </div>
  );
};

export default ArtistCard;
