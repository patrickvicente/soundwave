import React from "react";
import Tracklist from "./Tracklist";

function SearchResults(props) {
    return (
        <div className="searchResults">
            <h2>Results</h2>
            <Tracklist tracks={props.searchResults} onAdd={props.addTrack} isPlaylist={props.isPlaylist}/>
        </div>
    )
};

export default SearchResults;