import '../styles/App.css';
import React, { useState } from 'react';
import SearchBar from './SearchBar';
import SearchResults from './SearchResults';
import Playlist from './Playlist';

const hardcodedTracks = [
  {id: 1, name: "Track One", artist: "Artist One", album: "Album One"},
  {id: 2, name: "Track Two", artist: "Artist Two", album: "Album Two"},
  {id: 3, name: "Track Three", artist: "Artist Three", album: "Album Three"},
  {id: 4, name: "Track Four", artist: "Artist Four", album: "Album Four"},
  {id: 5, name: "Track Five", artist: "Artist Five", album: "Album Five"}
];

function App() {
  const [ searchResults, setSearchResults ] = useState([]);
  const [ currentPlaylist, setCurrentPlaylist] = useState([]);
  // handles query passed from SearchBar
  const handleSearch = (query) => {
    const results = hardcodedTracks.filter(track =>
      track.name.toLowerCase().includes(query.toLowerCase()) ||
      track.artist.toLowerCase().includes(query.toLowerCase()) ||
      track.album.toLowerCase().includes(query.toLowerCase()));    
      setSearchResults(results);
  };

  //  Adds track to playlist
  const addTrack = (newTrack) => {
    setCurrentPlaylist((prev) => {
      if (!prev.some(track => track.id === newTrack.id)) {
        return [...prev, newTrack]
      } else {
        return prev;
      }
    });
    // Removes track on search results
  //   setSearchResults((prev) => prev.filter((track) => newTrack.id !== track.id));
  };

  // Removes track from the playlist
  const removeTrack = (trackId) => {
    setCurrentPlaylist((prev) => prev.filter((track) => track.id !== trackId));
  };

  return (
    <div className="App">
      <header>
        <h1>Soundwave</h1>
      </header>
       <SearchBar onSearch={handleSearch} />
       <SearchResults searchResults={searchResults} addTrack={addTrack} isPlaylist={false} /> 
       <Playlist currentPlaylist={currentPlaylist} removeTrack={removeTrack} isPlaylist={true} />
    </div>
  );
}

export default App;
