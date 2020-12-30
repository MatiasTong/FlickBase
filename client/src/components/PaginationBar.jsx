import React from 'react'
import Pagination from '@material-ui/lab/Pagination';
import Grid from '@material-ui/core/Grid'
import Box from '@material-ui/core/Box'

export default function PaginationBar({handlePageInput, page}) {
  return (
    <div>
      <Grid container item sm={12} justify="center" spacing={3}>
        <Box m={3}>
          <Pagination count={10} page={page} onChange={handlePageInput}/>
        </Box>
      </Grid>
    </div>
  );
}
