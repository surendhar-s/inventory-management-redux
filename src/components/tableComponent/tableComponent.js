import { TextField } from '@material-ui/core';
import Checkbox from '@material-ui/core/Checkbox';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import IconButton from '@material-ui/core/IconButton';
import Paper from '@material-ui/core/Paper';
import Popper from '@material-ui/core/Popper';
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
import Tooltip from '@material-ui/core/Tooltip';
import Typography from '@material-ui/core/Typography';
import DeleteIcon from '@material-ui/icons/Delete';
import FilterListIcon from '@material-ui/icons/FilterList';
import clsx from 'clsx';
import moment from "moment";
import PropTypes from 'prop-types';
import React, { useEffect } from 'react';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import ListItemText from '@material-ui/core/ListItemText';
import './tableComponent.css';

// let rows = []

function descendingComparator(a, b, orderBy) {
  if (orderBy === "addedOn" || orderBy === "editedOn") {
    let field1 = moment(a[orderBy])
    let field2 = moment(b[orderBy])
    if (field1.diff(field2) < field2.diff(field1)) {
      return -1;
    }
    else if (field1.diff(field2) > field2.diff(field1)) {
      return 1;
    }
  }
  else if (orderBy === "stock") {
    if (parseInt(b[orderBy]) < parseInt(a[orderBy])) {
      return -1;
    }
    if (parseInt(b[orderBy]) > parseInt(a[orderBy])) {
      return 1;
    }
  }
  else if (orderBy === "manufracturer") {
    if (b["category"] < a["category"]) {
      return -1;
    }
    if (b["category"] > a["category"]) {
      return 1;
    }
  }
  else if (orderBy === "category") {
    if (b["subCategory"] < a["subCategory"]) {
      return -1;
    }
    if (b["subCategory"] > a["subCategory"]) {
      return 1;
    }
  }
  else {
    let bArray = orderBy === "price" || orderBy === "inventory" ? Number(b[orderBy].replace(/[^0-9.-]+/g, "")) : b[orderBy].toUpperCase()
    let aArray = orderBy === "price" || orderBy === "inventory" ? Number(a[orderBy].replace(/[^0-9.-]+/g, "")) : a[orderBy].toUpperCase()
    if (bArray < aArray) {
      return -1;
    }
    if (bArray > aArray) {
      return 1;
    }
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
function EnhancedTableHead(props) {
  const { classes, onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort } = props;
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };
  const headCells = props.headCells === undefined ? [] : props.headCells

  return (
    <TableHead>
      <TableRow>
        <TableCell padding="checkbox">
          <Checkbox
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={rowCount > 0 && numSelected === rowCount}
            onChange={onSelectAllClick}
            inputProps={{ 'aria-label': 'products' }}
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
              hideSortIcon={headCell.id === "Action" ? true : false}
              direction={orderBy === headCell.id ? order : 'asc'}
              onClick={headCell.id === "Action" ? console.log("") : createSortHandler(headCell.id)}
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
  headCells: PropTypes.array.isRequired
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
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
    maxWidth: 300,
  },
  chips: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  chip: {
    margin: 2,
  },
  noLabel: {
    marginTop: theme.spacing(3),
  },
}));

const EnhancedTableToolbar = (props) => {
  const classes = useToolbarStyles();
  const { numSelected } = props;
  const [anchorEl, setAnchorEl] = React.useState(null)
  const handleFilterClick = (event) => {
    setAnchorEl(anchorEl ? null : event.currentTarget);
  };
  let open = Boolean(anchorEl)
  const handleCategoryFilterClick = (e) => {
    // console.log(filterBy);
    // setAnchorEl(null)
    props.filterCategory(e)
  }
  let deleteAction = () => {
    let fakeObject = {
      target: { checked: false }
    }
    props.handleSelectAllClick(fakeObject)
    props.deleteProductId(props.selectedProduct)
  }
  const searchData = (e) => {
    props.searchValue(e.target.value);
  }
  const ITEM_HEIGHT = 48;
  const ITEM_PADDING_TOP = 8;
  const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
        width: 250,
      },
    },
  };
  let columns = props.columns === undefined ? [] : props.columns.slice(1, props.columns.length - 1)
  const [selectedColumns, setSelectedColumns] = React.useState(["Name", "Category", "Manufracturer", "Color", "In-Stock", "Price per Unit", "Inventory Value", "Added On", "Last Edited", "Action"])
  const handleChange = (event) => {
    setSelectedColumns(event.target.value);
    props.showOrHideColumns(event.target.value)
  };
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
            Products
          </Typography>
        )}

      {numSelected > 0 ? (
        <Tooltip title="Delete">
          <IconButton aria-label="delete" onClick={deleteAction}>
            <DeleteIcon />
          </IconButton>
        </Tooltip>
      ) : (
          <div style={{ display: "flex" }}>
            <FormControl className={classes.formControl}>
              <InputLabel id="demo-mutiple-checkbox-label">Columns</InputLabel>
              <Select
                labelId="demo-mutiple-checkbox-label"
                id="demo-mutiple-checkbox"
                multiple
                value={selectedColumns}
                onChange={handleChange}
                input={<Input />}
                renderValue={(selected) => ""}
                MenuProps={MenuProps}
              >
                {columns.map((name) => (
                  <MenuItem key={name.id} value={name.label}>
                    <Checkbox checked={selectedColumns.indexOf(name.label) > -1} />
                    <ListItemText primary={name.label} />
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <TextField id="standard-search" label="Search!" type="search" onChange={searchData} />
            <Tooltip title="Search and filter">
              <IconButton aria-label="filter list" onClick={handleFilterClick}>
                <FilterListIcon />
              </IconButton>
            </Tooltip>
          </div>
        )}
      <Popper open={open} anchorEl={anchorEl} style={{ background: "white" }}>
        <ClickAwayListener onClickAway={handleFilterClick}>
          <select onChange={handleCategoryFilterClick}>
            <option value="All-Cat">All Category</option>
            {
              props.categoryList.map(data => {
                return <option key={data.id} value={data.id}>{data.categoryName}</option>
              })
            }
          </select>
        </ClickAwayListener>
      </Popper>
    </Toolbar>
  );
};

EnhancedTableToolbar.propTypes = {
  numSelected: PropTypes.number.isRequired,
  selectedProduct: PropTypes.array.isRequired,
  deleteProductId: PropTypes.func,
  categoryList: PropTypes.array.isRequired,
  filterCategory: PropTypes.func.isRequired,
  handleSelectAllClick: PropTypes.func.isRequired,
  searchValue: PropTypes.func,
  columns: PropTypes.array,
  showOrHideColumns: PropTypes.func
};

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    padding: theme.spacing(2)
  },
  paper: {
    width: '100%',
    marginBottom: theme.spacing(2),
  },
  table: {
    minWidth: 750,
    // color: theme.palette.text.primary,
    // backgroundColor: theme.palette.secondary.dark,
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

export default function EnhancedTable(props) {
  const classes = useStyles();
  const [rows, setRows] = React.useState(props.tableData);
  const [tableHeadCells, setTableHeadCells] = React.useState(props.tableHeader)
  const [columns, setColumns] = React.useState([])
  const [order, setOrder] = React.useState('asc');
  const [orderBy, setOrderBy] = React.useState('name');
  const [selected, setSelected] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [dense, setDense] = React.useState(true);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [disableTimeoutFunc, setDisableTimeoutFunc] = React.useState(false)
  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };
  useEffect(() => {
    setDense(true)    //to avoid unwanted warnings
    let list = []
    if (props.tableHeader !== undefined) {
      props.tableHeader.map(data => list.push(data.label))
    }
    setColumns(list)
  }, [props.tableHeader])
  if (!disableTimeoutFunc) {
    setTimeout(() => {
      setRows(props.tableData)
    }, 50);
  }
  const showOrHideColumns = (receivedColumns) => {
    let list = []
    props.tableHeader.map(e => {
      if (receivedColumns.indexOf(e.label) >= 0) {
        list.push(e)
      }
      return 0
    })
    setTableHeadCells(list)
    setColumns(receivedColumns)
  }
  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = rows.map((n) => n.id);
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

  const searchData = (value) => {
    if (value === "") {
      setDisableTimeoutFunc(false)
      setRows(props.tableData)
    }
    else {
      let tempRow = []
      props.tableData.map(data => {
        if (data.name.toUpperCase().includes(value.toUpperCase()) || data.description.toUpperCase().includes(value.toUpperCase())) {
          tempRow.push(data);
        }
        return 0
      })
      setDisableTimeoutFunc(true)
      setRows(tempRow)
    }
  }

  const getTimeFromString = (dataInString) => {
    let momnetObject = moment(dataInString)
    return momnetObject.format("DD/MM/yyyy")
  }

  const isSelected = (id) => selected.indexOf(id) !== -1;

  const emptyRows = rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage);

  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
        <EnhancedTableToolbar
          numSelected={selected.length}
          selectedProduct={selected}
          deleteProductId={props.deleteProduct}
          categoryList={props.categoryList}
          filterCategory={props.filterCategory}
          handleSelectAllClick={handleSelectAllClick}
          searchValue={searchData}
          columns={props.tableHeader === undefined ? [] : props.tableHeader}
          showOrHideColumns={showOrHideColumns}
        />
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
              headCells={tableHeadCells}
            />
            <TableBody>
              {stableSort(rows, getComparator(order, orderBy))
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, index) => {
                  const isItemSelected = isSelected(row.id);
                  const labelId = `enhanced-table-checkbox-${index}`;
                  return (
                    <TableRow
                      hover
                      onClick={(event) => handleClick(event, row.id)}
                      role="checkbox"
                      aria-checked={isItemSelected}
                      tabIndex={-1}
                      key={row.name}
                      selected={isItemSelected}
                    // style={{color: theme.palette.text.primary}}
                    >
                      <TableCell padding="checkbox">
                        <Checkbox
                          checked={isItemSelected}
                          inputProps={{ 'aria-labelledby': labelId }}
                        />
                      </TableCell>
                      <TableCell component="th" id={labelId} scope="row" padding="none" className={columns.indexOf("Name") < 0 ? "hide-column" : ""}>
                        {row.name}
                      </TableCell>
                      <TableCell align="left" className={columns.indexOf("Category") < 0 ? "hide-column" : ""}>{row.subCategory}</TableCell>
                      <TableCell align="left" className={columns.indexOf("Manufracturer") < 0 ? "hide-column" : ""}>{row.category}</TableCell>
                      <TableCell align="left" className={columns.indexOf("Color") < 0 ? "hide-column" : ""}>{row.color}</TableCell>
                      <TableCell align="right" className={columns.indexOf("In-Stock") < 0 ? "hide-column" : ""}>{row.stock}</TableCell>
                      <TableCell align="right" className={columns.indexOf("Price per Unit") < 0 ? "hide-column" : ""}>{row.price}</TableCell>
                      <TableCell align="right" className={columns.indexOf("Inventory Value") < 0 ? "hide-column" : ""}>{row.inventory}</TableCell>
                      <TableCell align="right" className={columns.indexOf("Added On") < 0 ? "hide-column" : ""}>{getTimeFromString(row.addedOn)}</TableCell>
                      <TableCell align="right" className={columns.indexOf("Last Edited") < 0 ? "hide-column" : ""}>{row.updatedOn !== null ? getTimeFromString(row.updatedOn) : "NA"}</TableCell>
                      <TableCell align="center">{row.viewAction}</TableCell>
                    </TableRow>
                  );
                })}
              {emptyRows > 0 && (
                <TableRow style={{ height: (dense ? 33 : 53) * emptyRows }}>
                  <TableCell colSpan={6} />
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
    </div>
  );
}
