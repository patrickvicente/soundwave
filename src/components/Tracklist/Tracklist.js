import './Tracklist.css';
import React from "react";
import Track from "../Track/Track";

function Tracklist({tracks, onAdd, onRemove, isPlaylist}) {

    return (
        <div className="Tracklist">
            {tracks.length > 0 ? (
                tracks.map((track) => (
                    <Track
                        key={track.id}
                        trackId={track.id}
                        trackName={track.name}
                        trackArtist={track.artist}
                        trackAlbum={track.album}
                        onAdd={onAdd}
                        onRemove={onRemove}
                        isPlaylist={isPlaylist}
                    />
                ))
            ) : (
                <p>No tracks found.</p>
            )}
        </div>
    )
};

export default Tracklist;