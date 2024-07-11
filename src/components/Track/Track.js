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

    const truncate = (word) => {
        if (word.length > 45) {
            return word.slice(0, 45)+ '...';
        }

        return word;
    }; 

    return (
        <div className="Track">
            <div className="Track-information">
                <h3>{truncate(props.trackName)}</h3>
                <p>{props.trackArtist} || <span>{truncate(props.trackAlbum)}</span></p>
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