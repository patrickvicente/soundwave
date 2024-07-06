import React, { useState } from 'react';
import Tracklist from './Tracklist';

function Playlist({currentPlaylist, removeTrack, isPlaylist}) {
    const [ playlistName, setPlaylistName ] = useState('')

    const handleInputChange = (e) => {
        setPlaylistName(e.target.value);
    }

    return (
        <div className='playlist'>
            <input placeholder='New Playlist' value={playlistName} onChange={handleInputChange}/>
            <button>Save to Spotify</button>
            <Tracklist onRemove={removeTrack} isPlaylist={isPlaylist} tracks={currentPlaylist}/>
        </div>
    );
};

export default Playlist;