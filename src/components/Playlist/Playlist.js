import './Playlist.css';
import React, { useState } from 'react';
import Tracklist from '../Tracklist/Tracklist';

function Playlist({currentPlaylist, removeTrack, isPlaylist, onNameChange, onSave}) {

    const handleInputChange = (e) => {
        onNameChange(e.target.value);
    }

    return (
        <div className='Playlist'>
            <input defaultValue={'New Playlist'} onChange={handleInputChange}/>
            <Tracklist onRemove={removeTrack} isPlaylist={isPlaylist} tracks={currentPlaylist}/>
            <button className='Playlist-save' onClick={onSave}>Save to Spotify</button>
        </div>
    );
};

export default Playlist;