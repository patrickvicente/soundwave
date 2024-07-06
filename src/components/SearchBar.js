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
        <div className="searchBar">
            <input placeholder="Search" onChange={handleInputChange} value={searchQuery} />
            <button onClick={handleClick}>SEARCH</button>
        </div>
    );
};

export default SearchBar;
