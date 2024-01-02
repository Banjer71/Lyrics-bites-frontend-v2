import React from 'react'
import { AuthProvider } from "./components/context/AuthContext";
import ToastMessageProvider from "./components/context/toastMessage";
import { Routes, Route, useParams } from 'react-router-dom'
import SearchBar from "./components/search-bar/searchBar";
import SongPage from './components/song-page/song-page';
import SignUp from './components/signup/signup';
import DisplayAllSongs from './components/display-all-songs/display-all-songs'
import Login from './components/login/login';
import Navbar from './components/navbar/navBar';
import ShowLyrics from './components/show-lyrics/showLyrics'
import UserProfile from './components/profile/profile'

const App = () => {
  return (
    <AuthProvider>
      <ToastMessageProvider>
        <Navbar />
        <Routes>
          <Route path='/' element={<SearchBar />} />
          <Route path='/songPage' element={<SongPage />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/login" element={<Login />} />
          <Route path="/displayAllSongs" element={<DisplayAllSongs />} />
          <Route path="/showLyrics/:_id" element={<ShowLyrics />} />
          <Route path='/profile' element={<UserProfile />} />
        </Routes>
      </ToastMessageProvider>
    </AuthProvider>

  )
}

export default App