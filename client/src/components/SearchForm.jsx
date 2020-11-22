import React from 'react'
import SearchBar from "material-ui-search-bar";
import TextField from "@material-ui/core/TextField"

function SearchForm({searchTerm, onSearchInput, onSearchSubmit}) {
    return (
        <SearchBar
        value={searchTerm}
        onChange={onSearchInput}
        onRequestSearch={onSearchSubmit}
        style={{
          margin: '2rem auto',
          maxWidth: 800
        }}
      />
    )
}

export default SearchForm

