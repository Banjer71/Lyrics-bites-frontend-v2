import React from 'react'
import { AuthProvider } from "./components/context/AuthContext";
import ToastMessageProvider from "./components/context/toastMessage";
import { Routes, Route, useParams  } from 'react-router-dom'
import SearchBar from "./components/searchBar";
import SongPage from './components/song-page';
import SignUp from './components/signup/signup';
import DisplayAllSongs from './components/display-all-songs'
import Login from './components/login/login';
import Navbar from './components/navBar';
import ShowLyrics from './components/showLyrics'

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
        </Routes>
      </ToastMessageProvider>
    </AuthProvider>

  )
}

export default App