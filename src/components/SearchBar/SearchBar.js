import './SearchBar.css';
import React, { useState } from "react";

function SearchBar (props) {
    const [ searchQuery, setSearchQuery ] = useState('');

    // Handles input on search bar
    const handleInputChange = (e) => {
        setSearchQuery(e.target.value);
    };
    const handleClick = (e) => {
        e.preventDefault();
        props.onSearch(searchQuery);
        //  Clear the search input
        setSearchQuery('');
    };

    return (
        <div className="SearchBar">
            <input placeholder="Enter a Song, Artist or Album" onChange={handleInputChange} value={searchQuery} />
            <button onClick={handleClick} className='SearchButton'>SEARCH</button>
        </div>
    );
};

export default SearchBar;
