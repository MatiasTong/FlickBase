import React from 'react'
import SearchBar from "material-ui-search-bar";


function Search({searchTerm, onSearchInput, onSearchSubmit}) {
    return (
        <SearchBar
        value={searchTerm}
        onChange={onSearchInput}
        onRequestSearch={onSearchSubmit}
      />
    )
}

export default Search

