// import React from 'react'
// import { makeStyles } from '@material-ui/core/styles';
// import Table from '@material-ui/core/Table';
// import TableBody from '@material-ui/core/TableBody';
// import TableCell from '@material-ui/core/TableCell';
// import TableContainer from '@material-ui/core/TableContainer';
// import TableHead from '@material-ui/core/TableHead';
// import TableRow from '@material-ui/core/TableRow';
// import Paper from '@material-ui/core/Paper';
// import Grid from '@material-ui/core/Grid';
// import Typography from '@material-ui/core/Typography';
// import ArrowDropUpIcon from '@material-ui/icons/ArrowDropUp';
// import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';


// /* <form>
//                 <Grid container spacing={6}>
//                     <Grid item >
//                         <input placeholder = "Value"/>
//                     </Grid>
//                     <Grid item >
//                         <input placeholder = "Start Date"/>
//                     </Grid>
//                     <Grid item >
//                         <input placeholder = "End Date"/>
//                     </Grid>
//                 </Grid>
//             </form> */

// // $.ajax
// // "GET", "https://apidojo-yahoo-finance-v1.p.rapidapi.com/market/get-summary"
// // const apiKey = "pk_6d98d58cbe5d41b8ae7aa4cd66d016a9"

// const useStyles = makeStyles({
//     table: {
//         color: "white",
//         backgroundColor:"black",
//         minWidth: 650,
//         maxWidth: "90%"
//     },
// });

// function createData(company, symbol, dateAdded, prevSharePrice, currSharePrice, difference) {
//     return { company, symbol, dateAdded, prevSharePrice, currSharePrice, difference };
// }

// const rows = [
//     createData("Royal Dutch Shell", "RDS.B", "1/01/2020", 38.17, 38.70, 0.63),
//     createData("British American Tobacco", "BTI", "1/03/2020", 37.50, 37.70, 0.20),
//     createData('Apple', "AAPL", "1/05/2020", 125.00, 129.85, 4.85),
// ];

// export default function PortfolioTable() {
//     const classes = useStyles();

//     return (
//         <TableContainer component={Paper} classname>
//             <Table className={classes.table} aria-label="caption table">
//                 <caption>A basic table example with a caption</caption>
//                 <TableHead>
//                     <TableRow>
//                         <TableCell>Company</TableCell>
//                         <TableCell align="right">Symbol</TableCell>
//                         <TableCell align="right">Date Added</TableCell>
//                         <TableCell align="right">Previous Price&nbsp;</TableCell>
//                         <TableCell align="right">Current Price&nbsp;</TableCell>
//                         <TableCell align="right">Difference&nbsp;</TableCell>
//                     </TableRow>
//                 </TableHead>
//                 <TableBody>
//                     {rows.map((row) => (
//                         <TableRow key={row.name}>
//                             <TableCell component="th" scope="row">
//                                 {row.company}
//                             </TableCell>
//                             <TableCell align="right">{row.symbol}</TableCell>
//                             <TableCell align="right">{row.dateAdded}</TableCell>
//                             <TableCell align="right">{row.prevSharePrice}</TableCell>
//                             <TableCell align="right">{row.currSharePrice}</TableCell>
//                             <TableCell align="right">
// <Grid container justify="flex-end" alignItems="center">

//                                <Grid item sm={4}><ArrowDropDownIcon /></Grid> 
//                                <Grid item sm={4}>
//                                    {/* <Typography style={{fontSize:"0.875rem"}}> */}
//                                {row.difference}

//                                    {/* </Typography> */}
//                                </Grid>
// </Grid>
//                             </TableCell>
//                         </TableRow>
//                     ))}
//                 </TableBody>
//             </Table>
//         </TableContainer>
//     );
// }

import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { lighten, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Checkbox from '@material-ui/core/Checkbox';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import DeleteIcon from '@material-ui/icons/Delete';
import FilterListIcon from '@material-ui/icons/FilterList';

function createData(name, symbol, dateAdded, prevSharePrice, currSharePrice, change) {
  return { name, symbol, dateAdded, prevSharePrice, currSharePrice, change };
}

const rows = [
    createData("Royal Dutch Shell", "RDS.B", "1/01/2020", 38.17, 38.70, 0.63),
    createData("British American Tobacco", "BTI", "1/03/2020", 37.50, 37.70, 0.20),
    createData('Apple', "AAPL", "1/05/2020", 125.00, 129.85, 4.85),
    createData('Apple', "AAPL", "1/05/2020", 125.00, 129.85, 4.85),
];

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

// company, symbol, dateAdded, prevSharePrice, currSharePrice, change
const headCells = [
  { id: 'name', numeric: false, disablePadding: true, label: 'Company' },
  { id: 'symbol', numeric: true, disablePadding: false, label: 'Symbol' },
  { id: 'dateAdded', numeric: true, disablePadding: false, label: 'Date Added' },
  { id: 'prevSharePrice', numeric: true, disablePadding: false, label: 'Previous Price' },
  { id: 'currSharePrice', numeric: true, disablePadding: false, label: 'Current Price' },
  { id: 'change', numeric: true, disablePadding: false, label: 'Change' },
];

function EnhancedTableHead(props) {
  const { classes, onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort } = props;
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        <TableCell padding="checkbox">
          <Checkbox
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={rowCount > 0 && numSelected === rowCount}
            onChange={onSelectAllClick}
            inputProps={{ 'aria-label': 'Select All Stocksj' }}
          />
        </TableCell>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.numeric ? 'right' : 'left'}
            padding={headCell.disablePadding ? 'none' : 'default'}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : 'asc'}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <span className={classes.visuallyHidden}>
                  {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                </span>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

EnhancedTableHead.propTypes = {
  classes: PropTypes.object.isRequired,
  numSelected: PropTypes.number.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  onSelectAllClick: PropTypes.func.isRequired,
  order: PropTypes.oneOf(['asc', 'desc']).isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
};

const useToolbarStyles = makeStyles((theme) => ({
  root: {
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(1),
  },
  highlight:
    theme.palette.type === 'light'
      ? {
          color: theme.palette.secondary.main,
          backgroundColor: lighten(theme.palette.secondary.light, 0.85),
        }
      : {
          color: theme.palette.text.primary,
          backgroundColor: theme.palette.secondary.dark,
        },
  title: {
    flex: '1 1 100%',
  },
}));

const EnhancedTableToolbar = (props) => {
  const classes = useToolbarStyles();
  const { numSelected } = props;

  return (
    <Toolbar
      className={clsx(classes.root, {
        [classes.highlight]: numSelected > 0,
      })}
    >
      {numSelected > 0 ? (
        <Typography className={classes.title} color="inherit" variant="subtitle1" component="div">
          {numSelected} selected
        </Typography>
      ) : (
        <Typography className={classes.title} variant="h6" id="tableTitle" component="div">
          Portfolio
        </Typography>
      )}

      {numSelected > 0 ? (
        <Tooltip title="Delete">
          <IconButton aria-label="delete">
            <DeleteIcon />
          </IconButton>
        </Tooltip>
      ) : (
        <Tooltip title="Filter list">
          <IconButton aria-label="filter list">
            <FilterListIcon />
          </IconButton>
        </Tooltip>
      )}
    </Toolbar>
  );
};

EnhancedTableToolbar.propTypes = {
  numSelected: PropTypes.number.isRequired,
};

const useStyles = makeStyles((theme) => ({
  root: {
      color:"white",
    width: '100%',
  },
  paper: {
    color:"white",
    width: '100%',
    marginBottom: theme.spacing(2),
  },
  table: {
    minWidth: 750,
  },
  tableRow: {
      
  },
  tableCell: {
    "$hover:hover &": {
      color: "pink"
    }
  },
  visuallyHidden: {
    border: 0,
    clip: 'rect(0 0 0 0)',
    height: 1,
    margin: -1,
    overflow: 'hidden',
    padding: 0,
    position: 'absolute',
    top: 20,
    width: 1,
  },
}));

export default function PortfolioTable() {
  const classes = useStyles();
  const [order, setOrder] = React.useState('asc');
  const [orderBy, setOrderBy] = React.useState('calories');
  const [selected, setSelected] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [dense, setDense] = React.useState(false);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = rows.map((n) => n.name);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, name) => {
    const selectedIndex = selected.indexOf(name);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1),
      );
    }

    setSelected(newSelected);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleChangeDense = (event) => {
    setDense(event.target.checked);
  };

  const isSelected = (name) => selected.indexOf(name) !== -1;

  const emptyRows = rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage);

  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
        <EnhancedTableToolbar numSelected={selected.length} />
        <TableContainer>
          <Table
            className={classes.table}
            aria-labelledby="tableTitle"
            size={dense ? 'small' : 'medium'}
            aria-label="enhanced table"
          >
            <EnhancedTableHead
              classes={classes}
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              onSelectAllClick={handleSelectAllClick}
              onRequestSort={handleRequestSort}
              rowCount={rows.length}
            />
            <TableBody>
              {stableSort(rows, getComparator(order, orderBy))
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, index) => {
                  const isItemSelected = isSelected(row.name);
                  const labelId = `enhanced-table-checkbox-${index}`;

                  return (
                    <TableRow
                      hover
                      onClick={(event) => handleClick(event, row.name)}
                      role="checkbox"
                      aria-checked={isItemSelected}
                      tabIndex={-1}
                      key={row.name}
                      selected={isItemSelected}
                      className={classes.tableRow}
                    >
                      <TableCell padding="checkbox">
                        <Checkbox
                          checked={isItemSelected}
                          inputProps={{ 'aria-labelledby': labelId }}
                        />
                      </TableCell>
                      <TableCell component="th" id={labelId} scope="row" padding="none">
                        {row.name}
                      </TableCell>
                      <TableCell align="right">{row.symbol}</TableCell>
                      <TableCell align="right">{row.dateAdded}</TableCell>
                      <TableCell align="right">{row.prevSharePrice}</TableCell>
                      <TableCell align="right">{row.currSharePrice}</TableCell>
                      <TableCell align="right">{row.change}</TableCell>
                    </TableRow>
                  );
                })}
              {emptyRows > 0 && (
                <TableRow style={{ height: (dense ? 33 : 53) * emptyRows }}>
                  <TableCell colSpan={7} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onChangePage={handleChangePage}
          onChangeRowsPerPage={handleChangeRowsPerPage}
        />
      </Paper>
      <FormControlLabel
        control={<Switch checked={dense} onChange={handleChangeDense} />}
        label="Dense padding"
      />
    </div>
  );
}