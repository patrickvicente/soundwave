import React from "react";
import './Track.css';

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
        <div className="Track">
            <div className="Track-information">
                <h3>{props.trackName}</h3>
                <p><span>{props.trackArtist}</span> || <span>{props.trackAlbum}</span></p>
            </div>
            {/* Renders + or - depending when it's a playlist */}
            {props.isPlaylist ? (
                    <button onClick={handleClickRemove} className="Track-button">-</button>
                ) : (
                    <button className='Track-button' onClick={handleClickAdd}>+</button>
                )
            }
        </div>
    )
};

export default Track;