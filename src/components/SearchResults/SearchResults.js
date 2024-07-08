import './SearchResults.css';
import React from "react";
import Tracklist from "../Tracklist/Tracklist";

function SearchResults(props) {
    return (
        <div className="SearchResults">
            <h2>Results</h2>
            <Tracklist tracks={props.searchResults} onAdd={props.addTrack} isPlaylist={props.isPlaylist}/>
        </div>
    )
};

export default SearchResults;