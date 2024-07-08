import './App.css';
import React, { useCallback, useState } from 'react';
import SearchBar from '../SearchBar/SearchBar';
import SearchResults from '../SearchResults/SearchResults';
import Playlist from '../Playlist/Playlist';
import Spotify from '../../util/Spotify';


function App() {
  const [ searchResults, setSearchResults ] = useState([]);
  const [ currentPlaylist, setCurrentPlaylist] = useState([]);
  const [ playlistName, setPlaylistName ] = useState('');

  // handles query passed from SearchBar
  const handleSearch = useCallback((query) => {
    Spotify.search(query)
      .then(results => setSearchResults(results))
      .catch(error => console.error('Error fetching search results:', error));
  }, []);

  const updatePlaylistName = (name) => {
    setPlaylistName(name);
  };

  //  Adds track to playlist
  const addTrack = (newTrack) => {
    setCurrentPlaylist((prev) => {
      //  Checks if a track is already added
      if (!prev.some(track => track.id === newTrack.id)) {
        return [...prev, newTrack]
      } else {
        return prev;
      }
    });
  };

  // Removes track from the playlist
  const removeTrack = (trackId) => {
    setCurrentPlaylist((prev) => prev.filter((track) => track.id !== trackId));
  };

  const savePlaylist = useCallback(() => {
    const trackUris = currentPlaylist.map((track) => track.uri);
    Spotify.savePlaylist(playlistName, trackUris)
    .then(setPlaylistName('New Playlist'))
    .then(setCurrentPlaylist([]));
  }, [playlistName, currentPlaylist]);

  return (
    <div>
        <h1>Soundwave</h1>
      <div className="App">
        <SearchBar onSearch={handleSearch} />
        <div className='App-playlist'>
          <SearchResults searchResults={searchResults} addTrack={addTrack} isPlaylist={false} /> 
          <Playlist 
            currentPlaylist={currentPlaylist} 
            playlistName={playlistName}
            onNameChange={updatePlaylistName}
            removeTrack={removeTrack} 
            isPlaylist={true} 
            onSave={savePlaylist}
            />
          </div>
        </div>
    </div>
  );
}

export default App;
