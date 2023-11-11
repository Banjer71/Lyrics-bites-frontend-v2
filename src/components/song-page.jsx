import React, { useState, useEffect, useContext } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import defImage from "/imageDef.png";
import Button from "../components/reusable/buttons/button";
import ButtonSpinner from "../components/reusable/btn-spinner/btn-spinner";
import Toast from "./reusable/toast-message/toast";
import { ToastContext } from "./context/toastMessage";
import SideBar from "./sidebar/sidebar";
import { AuthContext } from "../components/context/AuthContext";
import "../css/songpage.css";

const SongPage = (props) => {
    console.log(props)
    const auth = useContext(AuthContext);

    let navigate = useNavigate();
    let { state } = useLocation();
    console.log(state)
    const [lyric, setLyric] = useState("");
    const [copyRight, setCopyright] = useState("null");
    const [artist, setArtist] = useState("");
    const [cover, setCover] = useState("");
    const [albumTitle, setAlbumTitle] = useState("");
    const [songTitle, setSongTitle] = useState("");
    const [albumId, setAlbumId] = useState("");
    const [updateState, setUpdateState] = useState(state);
    const [isLoading, setIsLoading] = useState(false);
    const { dispatch } = useContext(ToastContext);

    useEffect(() => {
        const abortControlledApi = new AbortController();
        const signal = abortControlledApi.signal;
        const trackId =
            state
                ? state.trackId
                : "";
        const songTrack =
            state
                ? state.songTitle
                : "";
        const idAlbum =
            state
                ? state.album_id
                : "";
        const album =
            state ? state.album : "";

        if (!trackId && !songTrack && idAlbum) {
            return;
        }

        if (!album) {
            return;
        }

        Promise.all([
            fetch(
                `/ws/1.1/track.lyrics.get?track_id=${trackId}&apikey=${`05cfdc2fd066962f1151f02dc6c192e6`}`
            ),
            fetch(
                `/ws/1.1/track.search?q_track=${songTrack}&apikey=${`05cfdc2fd066962f1151f02dc6c192e6`}`
            ),
            fetch(
                `/ws/1.1/album.tracks.get?album_id=${idAlbum}&apikey=${`05cfdc2fd066962f1151f02dc6c192e6`}`
            ),
            fetch(
                `/cover/2.0/?method=album.search&album=${album}&api_key=${`5066076ce70aa46f1b5326ea68f116c5`}&format=json`,
                { signal }
            ),
        ])
            .then((res) => Promise.all(res.map((res) => res.json())))
            .then((data) => {
                const lyrics = data[0].message.body.lyrics;
                const songTitle = data[1].message.body.track_list;
                const albumTracksList = data[2].message.body.track_list;
                const coverAlbum = data[3].results.albummatches.album[0];
                if (typeof lyrics !== "undefined") {
                    setLyric(lyrics.lyrics_body);
                    setCopyright(lyrics.lyrics_copyright);
                } else {
                    return;
                }
                setSongTitle(songTitle[0].track.track_name);
                setAlbumId(albumTracksList);
                if (typeof coverAlbum !== "undefined") {
                    setCover(coverAlbum.image[3]["#text"]);
                    setArtist(coverAlbum.artist);

                    setAlbumTitle(coverAlbum.name);
                } else {
                    setCover(defImage);
                }
            })
            .catch((err) => console.log(err));

        return function cleanUp() {
            abortControlledApi.abort();
        };
    }, [state]);

    const getAlbumTracks = (idTrack, idAlbum, ...props) => {
        let prevData = props.map((item) => {
            return {
                album_id: item.album_id,
                album_name: item.album_name,
                artistName: item.artist_name,
                artistId: item.artist_id,
                songTitle: item.track_name,
                trackId: item.track_id,
            };
        });
        setUpdateState(...prevData);

        Promise.all([
            fetch(
                `/ws/1.1/track.lyrics.get?track_id=${idTrack}&apikey=${`05cfdc2fd066962f1151f02dc6c192e6`}`
            ),
            fetch(
                `/ws/1.1/album.tracks.get?album_id=${idAlbum}&apikey=${`05cfdc2fd066962f1151f02dc6c192e6`}`
            ),
        ])
            .then((res) => Promise.all(res.map((res) => res.json())))
            .then((data) => {
                console.log(data);
                const lyric = data[0].message.body.lyrics;
                console.log(lyric);
                setLyric(lyric.lyrics_body);

                const songName = data[1].message.body.track_list;
                songName &&
                    songName.map((item) => {
                        return idTrack === item.track.track_id
                            ? setSongTitle(item.track.track_name)
                            : null;
                    });
            })
            .catch((error) => console.log(error));
    };

    const saveSong = async () => {
        setIsLoading(true);
        if (auth.isAuthenticated()) {
        const dataToSave = {
            ...updateState,
            words: lyric,
            userEmail: auth.authState.userInfo.email,
        };
        await fetch(`/v.1/api/song`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(dataToSave),
        })
            .then((res) => res.json())
            .then((data) => {
                console.log(data._id);
                console.log(data.type)
                setTimeout(() => {
                    setIsLoading(false);
                }, 400);
                switch (data.type) {
                    case "SUCCESS":
                        return dispatch({
                            type: "ADD_NOTIFICATION",
                            payload: {
                                id: data.id,
                                type: data.type,
                                title: "Success",
                                message: data.message,
                                icon: String.fromCharCode(10004),
                            },
                        });
                    case "EXIST":
                        return dispatch({
                            type: "ADD_NOTIFICATION",
                            payload: {
                                id: data.id,
                                type: data.type,
                                title: "Exist",
                                message: data.message,
                                icon: String.fromCharCode(9940),
                            },
                        });
                    default:
                        return;
                }
            })
            .catch((error) => {
                console.error(error);
            });
        } else {
            navigate("/signup");
        }
    };

    return (
        <div className="song-box" id="top">
            <div className="song-title-card">
                <div className="song-text">
                    <h1 className="song-title">{songTitle}</h1>
                    <pre className="lyrics">
                        {lyric !== ""
                            ? lyric
                            : copyRight === ""
                                ? "no lyrics on the database"
                                : copyRight}
                    </pre>

                    <Button onClick={saveSong} className="btn-get-song">
                        {isLoading ? <ButtonSpinner /> : "Save this song"}
                    </Button>

                    <Link to="/">
                        <Button>Back to the HomePage</Button>
                    </Link>
                </div>
                <Toast position="top-right" autoClose={2000} />
                <SideBar
                    artist={artist}
                    cover={cover}
                    albumTitle={albumTitle}
                    getAlbumTracks={getAlbumTracks}
                    albumId={albumId}
                />
            </div>
        </div>
    );
};

export default SongPage;
