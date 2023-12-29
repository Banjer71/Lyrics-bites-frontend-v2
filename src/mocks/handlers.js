
import { HttpResponse, http, delay } from 'msw'

export const handlers = [
    http.get(url, async ({params}) => {
        return HttpResponse.json(
            [
                {
                    "track": {
                        "track_id": 257880609,
                        "track_name": "Fearless (feat. Pilani Bubu)",
                        "track_name_translation_list": [],
                        "track_rating": 87,
                        "commontrack_id": 160210729,
                        "instrumental": 0,
                        "explicit": 0,
                        "has_lyrics": 1,
                        "has_subtitles": 1,
                        "has_richsync": 0,
                        "num_favourite": 0,
                        "album_id": 57384235,
                        "album_name": "Music Theory",
                        "artist_id": 28818958,
                        "artist_name": "Prince Kaybee",
                        "track_share_url": "https://www.musixmatch.com/lyrics/Prince-Kaybee-2/Fearless-Pilani-Bubu?utm_source=application&utm_campaign=api&utm_medium=...%3A1409618696701",
                        "track_edit_url": "https://www.musixmatch.com/lyrics/Prince-Kaybee-2/Fearless-Pilani-Bubu/edit?utm_source=application&utm_campaign=api&utm_medium=...%3A1409618696701",
                        "restricted": 0,
                        "updated_time": "2023-08-28T01:00:27Z",
                        "primary_genres": {
                            "music_genre_list": [
                                {
                                    "music_genre": {
                                        "music_genre_id": 17,
                                        "music_genre_parent_id": 34,
                                        "music_genre_name": "Dance",
                                        "music_genre_name_extended": "Dance",
                                        "music_genre_vanity": "Dance"
                                    }
                                }
                            ]
                        }
                    }
                },
                {
                    "track": {
                        "track_id": 139525665,
                        "track_name": "Sensualidad",
                        "track_name_translation_list": [],
                        "track_rating": 80,
                        "commontrack_id": 77373938,
                        "instrumental": 0,
                        "explicit": 0,
                        "has_lyrics": 1,
                        "has_subtitles": 1,
                        "has_richsync": 1,
                        "num_favourite": 1080,
                        "album_id": 27345279,
                        "album_name": "Sensualidad",
                        "artist_id": 34647945,
                        "artist_name": "Bad Bunny feat. Prince Royce, J Balvin, Mambo Kingz & DJ Luian",
                        "track_share_url": "https://www.musixmatch.com/lyrics/Bad-Bunny-feat-Prince-Royce-J-Balvin-Mambo-Kingz-DJ-Luian/sensualidad-mambo-kingz-dj-luian?utm_source=application&utm_campaign=api&utm_medium=...%3A1409618696701",
                        "track_edit_url": "https://www.musixmatch.com/lyrics/Bad-Bunny-feat-Prince-Royce-J-Balvin-Mambo-Kingz-DJ-Luian/sensualidad-mambo-kingz-dj-luian/edit?utm_source=application&utm_campaign=api&utm_medium=...%3A1409618696701",
                        "restricted": 0,
                        "updated_time": "2022-03-04T19:07:03Z",
                        "primary_genres": {
                            "music_genre_list": [
                                {
                                    "music_genre": {
                                        "music_genre_id": 1119,
                                        "music_genre_parent_id": 12,
                                        "music_genre_name": "Latin Urban",
                                        "music_genre_name_extended": "Latin / Latin Urban",
                                        "music_genre_vanity": "Latin-Latin-Urban"
                                    }
                                },
                                {
                                    "music_genre": {
                                        "music_genre_id": 12,
                                        "music_genre_parent_id": 34,
                                        "music_genre_name": "Latin",
                                        "music_genre_name_extended": "Latin",
                                        "music_genre_vanity": "Latin"
                                    }
                                }
                            ]
                        }
                    }
                },
                {
                    "track": {
                        "track_id": 84539055,
                        "track_name": "Darte un Beso",
                        "track_name_translation_list": [],
                        "track_rating": 79,
                        "commontrack_id": 12362790,
                        "instrumental": 0,
                        "explicit": 1,
                        "has_lyrics": 1,
                        "has_subtitles": 1,
                        "has_richsync": 1,
                        "num_favourite": 8548,
                        "album_id": 20913158,
                        "album_name": "Soy el Mismo",
                        "artist_id": 13036847,
                        "artist_name": "Prince Royce",
                        "track_share_url": "https://www.musixmatch.com/lyrics/Prince-Royce/Darte-un-beso?utm_source=application&utm_campaign=api&utm_medium=...%3A1409618696701",
                        "track_edit_url": "https://www.musixmatch.com/lyrics/Prince-Royce/Darte-un-beso/edit?utm_source=application&utm_campaign=api&utm_medium=...%3A1409618696701",
                        "restricted": 0,
                        "updated_time": "2023-01-03T09:07:52Z",
                        "primary_genres": {
                            "music_genre_list": [
                                {
                                    "music_genre": {
                                        "music_genre_id": 1124,
                                        "music_genre_parent_id": 12,
                                        "music_genre_name": "Salsa y Tropical",
                                        "music_genre_name_extended": "Latin / Salsa y Tropical",
                                        "music_genre_vanity": "Latin-Salsa-y-Tropical"
                                    }
                                },
                                {
                                    "music_genre": {
                                        "music_genre_id": 24,
                                        "music_genre_parent_id": 34,
                                        "music_genre_name": "Reggae",
                                        "music_genre_name_extended": "Reggae",
                                        "music_genre_vanity": "Reggae"
                                    }
                                }
                            ]
                        }
                    }
                },
                {
                    "track": {
                        "track_id": 126161887,
                        "track_name": "Purple Rain",
                        "track_name_translation_list": [],
                        "track_rating": 79,
                        "commontrack_id": 42311,
                        "instrumental": 0,
                        "explicit": 0,
                        "has_lyrics": 1,
                        "has_subtitles": 1,
                        "has_richsync": 1,
                        "num_favourite": 1751,
                        "album_id": 25599373,
                        "album_name": "Purple Rain",
                        "artist_id": 92,
                        "artist_name": "Prince",
                        "track_share_url": "https://www.musixmatch.com/lyrics/Prince/Purple-Rain?utm_source=application&utm_campaign=api&utm_medium=...%3A1409618696701",
                        "track_edit_url": "https://www.musixmatch.com/lyrics/Prince/Purple-Rain/edit?utm_source=application&utm_campaign=api&utm_medium=...%3A1409618696701",
                        "restricted": 0,
                        "updated_time": "2020-10-06T10:44:48Z",
                        "primary_genres": {
                            "music_genre_list": [
                                {
                                    "music_genre": {
                                        "music_genre_id": 14,
                                        "music_genre_parent_id": 34,
                                        "music_genre_name": "Pop",
                                        "music_genre_name_extended": "Pop",
                                        "music_genre_vanity": "Pop"
                                    }
                                },
                                {
                                    "music_genre": {
                                        "music_genre_id": 15,
                                        "music_genre_parent_id": 34,
                                        "music_genre_name": "R&B/Soul",
                                        "music_genre_name_extended": "R&B/Soul",
                                        "music_genre_vanity": "R-B-Soul"
                                    }
                                },
                                {
                                    "music_genre": {
                                        "music_genre_id": 16,
                                        "music_genre_parent_id": 34,
                                        "music_genre_name": "Soundtrack",
                                        "music_genre_name_extended": "Soundtrack",
                                        "music_genre_vanity": "Soundtrack"
                                    }
                                },
                                {
                                    "music_genre": {
                                        "music_genre_id": 21,
                                        "music_genre_parent_id": 34,
                                        "music_genre_name": "Rock",
                                        "music_genre_name_extended": "Rock",
                                        "music_genre_vanity": "Rock"
                                    }
                                },
                                {
                                    "music_genre": {
                                        "music_genre_id": 1133,
                                        "music_genre_parent_id": 14,
                                        "music_genre_name": "Pop/Rock",
                                        "music_genre_name_extended": "Pop / Pop/Rock",
                                        "music_genre_vanity": "Pop-Pop-Rock"
                                    }
                                }
                            ]
                        }
                    }
                }
            ]
        )
    }),
    
]

