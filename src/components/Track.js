import React from "react";

function Track(props) {
    const handleClickAdd = () => {
        props.onAdd({
            id: props.trackId,
            name: props.trackName,
            artist: props.trackArtist,
            album: props.trackAlbum
        });
    };

    const handleClickRemove = () => {
        props.onRemove(props.trackId);
    };

    return (
        <div className="track">
            <h3 id="trackName">{props.trackName}</h3>
            <p><span>{props.trackArtist}</span> || <span>{props.trackAlbum}</span></p>
            {/* Renders + or - depending when it's a playlist */}
            {props.isPlaylist ? (
                <button onClick={handleClickRemove}>-</button>
            ) : (
                <button onClick={handleClickAdd}>+</button>
            )}
        </div>
    )
};

export default Track;