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
    const auth = useContext(AuthContext);

    let navigate = useNavigate();
    let { state } = useLocation();
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


        const songFecth = async () => {
            const response = await fetch(
                `https://lyrics-bites-backend-v2.vercel.app/api/songs/${trackId}/${songTrack}/${idAlbum}/${album}`, { signal }
            )

            const songsData = await response.json();
            const lyrics = songsData.data[0].message.body.lyrics;
            const songTitle = songsData.data[1].message.body.track_list;
            const albumTracksList = songsData.data[2].message.body.track_list;
            const coverAlbum = songsData.data[3].results.albummatches.album[0];
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

            // const lyrics = songsData.lyrics.lyrics_body;
            // const songTitle = songsData.songTitle[1].track.track_name;
            // const albumTracksList = songsData.albumTracksList[0].track.track_name
            // console.log(';;;;;;;;;', albumTracksList)
            // const coverAlbum = songsData.coverAlbum;
            // if (typeof lyrics !== "undefined") {
            //     setLyric(lyrics);
            //     setCopyright(lyrics.lyrics_copyright);
            // } else {
            //     return;
            // }
            // setSongTitle(songTitle);
            // setAlbumId(albumTracksList);
            // if (typeof coverAlbum !== "undefined") {
            //     setCover(coverAlbum.image[3]["#text"]);
            //     setArtist(coverAlbum.artist);
            //     setAlbumTitle(coverAlbum.name);
            // } else {
            //     setCover(defImage);
            // }
            // console.log(coverAlbum)
        };
        songFecth()
    }, [state])




    const getAlbumTracks = (idTrack, idAlbum, ...state) => {
        console.log(state)
        let prevData = state.map((item) => {
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

        const fetchAlbumTracks = async () => {
            const response = await fetch(
                `https://lyrics-bites-backend-v2.vercel.app/api/albumTrack/${idTrack}/${idAlbum}`
            )
            const data = await response.json();
            console.log('data: ', data)
            const lyric = data.data[0].message.body.lyrics;
            console.log(lyric);
            setLyric(lyric.lyrics_body);

            const songName = data.data[1].message.body.track_list;
            songName &&
                songName.map((item) => {
                    return idTrack === item.track.track_id
                        ? setSongTitle(item.track.track_name)
                        : null;
                });

            //         .catch((error) => console.log(error));

        }
        fetchAlbumTracks()
    };


    const saveSong = async () => {
        setIsLoading(true);
        if (auth.isAuthenticated()) {
            const dataToSave = {
                ...updateState,
                words: lyric,
                userEmail: auth.authState.userInfo.email,
            };
            console.log(dataToSave)
            await fetch(`https://lyrics-bites-backend-v2.vercel.app/api/song`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(dataToSave),
            })
                .then((res) => res.json())
                .then((data) => {
                    console.log(data);
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
