import React from 'react'
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import Box from "@material-ui/core/Box"
import Grid from "@material-ui/core/Grid"
import Search from "./Search"
import SearchSubtitle from "./SearchSubtitle"

export default function SearchForm({
    onSearchInput, onSearchSubmit, searchTerm, resultsCount, sortOption, onSortSelect, isSubmit }) {
    return (
        <div>
            <Grid container justify="center" alignItems="center">
                <Box mt={2} width="100%">
                <Grid container item justify="center" alignItems="center" spacing={2}>
                <Grid item  sm={6} lg={6}>
                    <Search
                        onSearchInput={onSearchInput}
                        onSearchSubmit={onSearchSubmit}
                        searchTerm={searchTerm}
                    />
                </Grid>
                <Grid item sm={2} lg={1}>
                <FormControl variant="outlined" >
                    <Select
                        value={sortOption}
                        onChange={onSortSelect}
                        displayEmpty
                        inputProps={{ 'aria-label': 'Without label' }}
                        >
                        <MenuItem value="">
                            Sort
                    </MenuItem>
                        <MenuItem value={10}>Recently Added</MenuItem>
                        <MenuItem value={20}>Popular</MenuItem>
                        <MenuItem value={30}></MenuItem>
                    </Select>
                    {/* <FormHelperText>Without label</FormHelperText> */}
                </FormControl>
               
                </Grid>
                </Grid>
                        </Box>

                <Grid item xs={8} sm={8} lg={7}>
                <SearchSubtitle
                    searchTerm={searchTerm}
                    resultsCount={resultsCount}
                    isSubmit = {isSubmit} />

                </Grid>
            </Grid>


        </div>
    )
}
